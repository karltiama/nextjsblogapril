'use client'

import React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; retry: () => void }>
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log chunk loading errors
    if (error.name === 'ChunkLoadError') {
      console.warn('ChunkLoadError detected:', error.message)
      // Auto-reload for chunk errors in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Auto-reloading page due to chunk error...')
        setTimeout(() => window.location.reload(), 100)
      }
    }
  }

  retry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error} retry={this.retry} />
      }

      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4 p-8">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Something went wrong
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {this.state.error?.name === 'ChunkLoadError'
                ? 'A loading error occurred. The page will refresh automatically.'
                : 'An unexpected error occurred.'}
            </p>
          </div>
          <button
            onClick={this.retry}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

// Hook for functional components to handle chunk errors
export function useChunkErrorHandler() {
  React.useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.error?.name === 'ChunkLoadError') {
        console.warn('ChunkLoadError detected, reloading page...')
        window.location.reload()
      }
    }

    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [])
} 