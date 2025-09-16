'use client'

import { useState, useEffect } from 'react'
import Spline from '@splinetool/react-spline'

interface SplineBasicProps {
  splineUrl: string
}

export default function SplineBasic({ splineUrl }: SplineBasicProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [timeoutReached, setTimeoutReached] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const onLoad = (splineApp: any) => {
    setIsLoaded(true)
    setError(null)
    console.log('Spline scene loaded successfully!')
    console.log('Spline app object:', splineApp)
    
    // Test if we can find objects
    if (splineApp && splineApp.findObjectByName) {
      console.log('Testing object finding...')
      const testObjects = ['Monitor', 'UI', 'Puzzle', 'Framework', 'Cloud', 'OverlayViel']
      testObjects.forEach(name => {
        const obj = splineApp.findObjectByName(name)
        console.log(`Object "${name}":`, obj ? 'Found' : 'Not found')
      })
    }
  }

  // Set up timeout to break loading loop
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isLoaded && !error) {
        console.log('Loading timeout reached - breaking loop')
        setTimeoutReached(true)
        setError('Loading timeout - the scene took too long to load. This usually means the URL is incorrect or the scene is private.')
      }
    }, 8000) // 8 second timeout

    return () => clearTimeout(timeout)
  }, [isLoaded, error])

  const onError = (error: any) => {
    console.error('Spline loading error:', error)
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      toString: error.toString()
    })
    
    let errorMessage = 'Failed to load scene'
    
    if (error.message && error.message.includes('Unexpected token')) {
      errorMessage = 'Invalid scene format - the URL may be incorrect or the scene may be private'
    } else if (error.message) {
      errorMessage = `Failed to load scene: ${error.message}`
    } else {
      errorMessage = 'Unknown error occurred'
    }
    
    setError(errorMessage)
  }

  if (!isClient) {
    return (
      <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-2xl bg-slate-800 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading Spline component...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Spline Scene */}
      <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-2xl">
        {splineUrl && (
          <Spline
            scene={splineUrl}
            onLoad={onLoad}
            onError={onError}
          />
        )}
      </div>

      {/* Loading State */}
      {!isLoaded && !error && !timeoutReached && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 rounded-lg">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading Spline scene...</p>
            <p className="text-sm text-slate-400 mt-2">This may take a few seconds</p>
            <button
              onClick={() => {
                setTimeoutReached(true)
                setError('Loading manually stopped - check the URL test above for details')
              }}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
            >
              Stop Loading & Show Error
            </button>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-900/50 backdrop-blur-sm rounded-lg">
          <div className="text-white text-center p-4">
            <div className="text-red-400 text-lg mb-2">⚠️ Error</div>
            <p className="text-sm">{error}</p>
            <div className="mt-4 text-xs text-slate-300">
              <p>Try these solutions:</p>
              <ul className="mt-2 space-y-1">
                <li>• Make sure your Spline scene is set to "Public"</li>
                <li>• Check the URL is correct</li>
                <li>• Try re-exporting the scene</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Success State */}
      {isLoaded && !error && (
        <div className="absolute top-4 right-4">
          <div className="bg-green-500/20 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">
                Scene Loaded Successfully!
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Object Detection Test */}
      {isLoaded && !error && (
        <div className="absolute bottom-4 left-4">
          <div className="bg-blue-500/20 backdrop-blur-sm rounded-lg p-3">
            <div className="text-blue-400 text-sm">
              <p className="font-medium mb-1">Object Detection Test:</p>
              <p className="text-xs">Check browser console for layer detection results</p>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-4 text-center text-slate-300">
        <p className="text-sm">
          {isLoaded && !error
            ? &apos;Great! Your Spline scene is rendering. Now we can add the opacity animations.&apos;
            : error
            ? &apos;Fix the error above to continue&apos;
            : &apos;Loading your Spline scene...&apos;
          }
        </p>
      </div>
    </div>
  )
}
