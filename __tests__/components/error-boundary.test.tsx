import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ErrorBoundary, useChunkErrorHandler } from '@/components/error-boundary'

// Mock console methods to avoid noise in tests
const originalConsoleWarn = console.warn
const originalConsoleLog = console.log

beforeEach(() => {
  console.warn = jest.fn()
  console.log = jest.fn()
})

afterEach(() => {
  console.warn = originalConsoleWarn
  console.log = originalConsoleLog
})

// Test component that throws an error
const ThrowError = ({ shouldThrow = true, errorType = 'Error' }: { shouldThrow?: boolean; errorType?: string }) => {
  if (shouldThrow) {
    const error = new Error('Test error')
    error.name = errorType
    throw error
  }
  return <div>No error</div>
}

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    )

    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('renders error UI when child component throws an error', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getByText('An unexpected error occurred.')).toBeInTheDocument()
    expect(screen.getByText('Try again')).toBeInTheDocument()
  })

  it('renders specific message for ChunkLoadError', () => {
    render(
      <ErrorBoundary>
        <ThrowError errorType="ChunkLoadError" />
      </ErrorBoundary>
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getByText('A loading error occurred. The page will refresh automatically.')).toBeInTheDocument()
  })

  it('logs ChunkLoadError to console', () => {
    render(
      <ErrorBoundary>
        <ThrowError errorType="ChunkLoadError" />
      </ErrorBoundary>
    )

    expect(console.warn).toHaveBeenCalledWith('ChunkLoadError detected:', 'Test error')
  })

  it('uses custom fallback component when provided', () => {
    const CustomFallback = ({ error, retry }: { error?: Error; retry: () => void }) => (
      <div>
        <p>Custom error: {error?.message}</p>
        <button onClick={retry}>Custom retry</button>
      </div>
    )

    render(
      <ErrorBoundary fallback={CustomFallback}>
        <ThrowError />
      </ErrorBoundary>
    )

    expect(screen.getByText('Custom error: Test error')).toBeInTheDocument()
    expect(screen.getByText('Custom retry')).toBeInTheDocument()
  })

  it('retries successfully when retry button is clicked', () => {
    let shouldThrow = true
    const RetryTest = () => <ThrowError shouldThrow={shouldThrow} />

    const { rerender } = render(
      <ErrorBoundary>
        <RetryTest />
      </ErrorBoundary>
    )

    // Error state
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()

    // Fix the error condition
    shouldThrow = false

    // Click retry
    fireEvent.click(screen.getByText('Try again'))

    // Re-render with fixed state
    rerender(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    )

    expect(screen.getByText('No error')).toBeInTheDocument()
  })
})

describe('useChunkErrorHandler', () => {
  // Mock window.location.reload
  const mockReload = jest.fn()
  Object.defineProperty(window, 'location', {
    value: { reload: mockReload },
    writable: true,
  })

  beforeEach(() => {
    mockReload.mockClear()
  })

  it('attaches error event listener on mount', () => {
    const addEventListener = jest.spyOn(window, 'addEventListener')
    
    const TestComponent = () => {
      useChunkErrorHandler()
      return <div>Test</div>
    }

    render(<TestComponent />)

    expect(addEventListener).toHaveBeenCalledWith('error', expect.any(Function))
  })

  it('removes error event listener on unmount', () => {
    const removeEventListener = jest.spyOn(window, 'removeEventListener')
    
    const TestComponent = () => {
      useChunkErrorHandler()
      return <div>Test</div>
    }

    const { unmount } = render(<TestComponent />)
    unmount()

    expect(removeEventListener).toHaveBeenCalledWith('error', expect.any(Function))
  })

  it('reloads page when ChunkLoadError occurs', () => {
    const TestComponent = () => {
      useChunkErrorHandler()
      return <div>Test</div>
    }

    render(<TestComponent />)

    // Simulate ChunkLoadError
    const errorEvent = new ErrorEvent('error', {
      error: { name: 'ChunkLoadError', message: 'Loading chunk failed' }
    })

    window.dispatchEvent(errorEvent)

    expect(console.warn).toHaveBeenCalledWith('ChunkLoadError detected, reloading page...')
    expect(mockReload).toHaveBeenCalled()
  })

  it('does not reload page for other errors', () => {
    const TestComponent = () => {
      useChunkErrorHandler()
      return <div>Test</div>
    }

    render(<TestComponent />)

    // Simulate regular error
    const errorEvent = new ErrorEvent('error', {
      error: { name: 'TypeError', message: 'Regular error' }
    })

    window.dispatchEvent(errorEvent)

    expect(mockReload).not.toHaveBeenCalled()
  })
}) 