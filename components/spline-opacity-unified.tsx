'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import Spline from '@splinetool/react-spline/next'

interface SplineOpacityUnifiedProps {
  // Support both URL and local file
  splineUrl?: string
  splineFile?: string
  layerNames?: string[]
  opacityValue?: number
  transitionDuration?: number
  method?: 'url' | 'file'
}

export default function SplineOpacityUnified({ 
  splineUrl,
  splineFile,
  layerNames = [
    'Layer1', // Top layer
    'Layer2', // Second layer  
    'Layer3', // Third layer
    'Layer4', // Fourth layer
    'Layer5', // Fifth layer
    'OpacityLayer' // Opacity layer
  ],
  opacityValue = 0.3,
  transitionDuration = 300,
  method = 'url'
}: SplineOpacityUnifiedProps) {
  const splineRef = useRef<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loadingTimeout, setLoadingTimeout] = useState<NodeJS.Timeout | null>(null)
  const [currentSource, setCurrentSource] = useState<'url' | 'file' | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  // Determine which source to use - try URL first, then fallback to file
  const splineSource = currentSource === 'file' ? splineFile : splineUrl || splineFile

  const onLoad = useCallback((splineApp: any) => {
    // Clear any existing timeout
    if (loadingTimeout) {
      clearTimeout(loadingTimeout)
      setLoadingTimeout(null)
    }
    
    // Store the spline app reference
    splineRef.current = splineApp
    setIsLoaded(true)
    setError(null)
    console.log('Spline scene loaded successfully')
    console.log('Available objects:', splineApp.findObjectByName ? 'findObjectByName available' : 'findObjectByName not available')
    
    // Set up event listeners for your Spline objects
    setupEventListeners(splineApp)
  }, [loadingTimeout])

  const onError = useCallback((error: any) => {
    console.error('Spline loading error:', error)
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      toString: error.toString(),
      splineSource,
      currentSource,
      retryCount
    })
    
    // Try fallback if we haven't tried both sources yet
    if (retryCount === 0 && splineUrl && splineFile) {
      console.log('Trying fallback from URL to local file...')
      setRetryCount(1)
      setCurrentSource('file')
      setError(null)
      return
    }
    
    let errorMessage = 'Failed to load Spline scene'
    
    if (error.message) {
      errorMessage += `: ${error.message}`
    } else if (error.toString().includes('Data read, but end of buffer not reached')) {
      errorMessage = 'Invalid Spline scene format. Please check your URL or file.'
    } else if (error.toString().includes('NetworkError') || error.toString().includes('fetch')) {
      errorMessage = 'Network error. Please check your internet connection and URL.'
    } else if (error.toString().includes('403')) {
      errorMessage = 'Access denied (403). The Spline scene may be private or restricted.'
    } else if (error.toString().includes('404')) {
      errorMessage = 'Scene not found (404). Please check the URL or file path.'
    } else {
      errorMessage += ': Unknown error'
    }
    
    setError(errorMessage)
  }, [splineSource, currentSource, retryCount, splineUrl, splineFile])

  // Set up event listeners for layer hover detection
  const setupEventListeners = (splineApp: any) => {
    try {
      // You'll need to configure your Spline scene to emit events
      // This is where you'd set up the actual hover detection
      layerNames.forEach((layerName, index) => {
        if (index < layerNames.length - 1) { // Skip the opacity layer
          const object = splineApp.findObjectByName(layerName)
          if (object) {
            // Set up hover events - this depends on your Spline scene configuration
            // You might need to add event listeners in your Spline scene itself
            console.log(`Setting up events for ${layerName}`)
          }
        }
      })
    } catch (error) {
      console.warn('Error setting up event listeners:', error)
    }
  }

  // Function to set layer opacity with smooth transition
  const setLayerOpacity = useCallback((layerName: string, opacity: number) => {
    if (!splineRef.current) return

    try {
      const object = splineRef.current.findObjectByName(layerName)
      if (object && object.material) {
        // Smooth transition
        const startOpacity = object.material.opacity || 1
        const duration = transitionDuration
        const startTime = Date.now()

        const animate = () => {
          const elapsed = Date.now() - startTime
          const progress = Math.min(elapsed / duration, 1)
          
          // Easing function for smooth transition
          const easeInOut = progress < 0.5 
            ? 2 * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 2) / 2

          const currentOpacity = startOpacity + (opacity - startOpacity) * easeInOut
          
          object.material.opacity = currentOpacity
          object.material.transparent = currentOpacity < 1
          object.material.needsUpdate = true

          if (progress < 1) {
            requestAnimationFrame(animate)
          }
        }

        animate()
      }
    } catch (error) {
      console.warn(`Could not find layer: ${layerName}`, error)
    }
  }, [transitionDuration])

  // Function to handle layer hover
  const handleLayerHover = useCallback((layerIndex: number) => {
    if (!isLoaded || isTransitioning) return

    setIsTransitioning(true)
    setHoveredLayer(layerIndex)
    
    // Calculate how many layers should transition to opacity
    const layersToTransition = layerIndex - 1 // layer 2 = 1 layer, layer 3 = 2 layers, etc.
    
    // Reset all layers to full opacity first
    layerNames.forEach((layerName, index) => {
      if (index < layerNames.length - 1) { // Don't modify the opacity layer itself
        setLayerOpacity(layerName, 1)
      }
    })

    // Transition the appropriate number of top layers to opacity
    for (let i = 0; i < layersToTransition && i < layerNames.length - 1; i++) {
      const layerName = layerNames[i] // Start from top layer
      setLayerOpacity(layerName, opacityValue) // Set to semi-transparent
    }

    // Reset transition flag after animation
    setTimeout(() => setIsTransitioning(false), transitionDuration)
  }, [isLoaded, isTransitioning, layerNames, opacityValue, setLayerOpacity, transitionDuration])

  // Function to reset all layers to normal opacity
  const resetLayers = useCallback(() => {
    if (!isLoaded || isTransitioning) return

    setIsTransitioning(true)
    setHoveredLayer(null)
    
    // Reset all layers to full opacity
    layerNames.forEach((layerName, index) => {
      if (index < layerNames.length - 1) { // Don't modify the opacity layer itself
        setLayerOpacity(layerName, 1)
      }
    })

    // Reset transition flag after animation
    setTimeout(() => setIsTransitioning(false), transitionDuration)
  }, [isLoaded, isTransitioning, layerNames, setLayerOpacity, transitionDuration])

  // Initialize source - try URL first
  useEffect(() => {
    if (splineUrl && !currentSource) {
      setCurrentSource('url')
    } else if (splineFile && !currentSource) {
      setCurrentSource('file')
    }
  }, [splineUrl, splineFile, currentSource])

  // Set up loading timeout
  useEffect(() => {
    if (splineSource && !isLoaded && !error) {
      const timeout = setTimeout(() => {
        setError('Loading timeout. The Spline scene took too long to load.')
      }, 10000) // 10 second timeout
      
      setLoadingTimeout(timeout)
      
      return () => {
        clearTimeout(timeout)
        setLoadingTimeout(null)
      }
    }
  }, [splineSource, isLoaded, error])

  // Expose methods for external control
  useEffect(() => {
    if (isLoaded && splineRef.current) {
      // You can expose these methods to parent components if needed
      (splineRef.current as any).handleLayerHover = handleLayerHover
      ;(splineRef.current as any).resetLayers = resetLayers
    }
  }, [isLoaded, handleLayerHover, resetLayers])

  return (
    <div className="relative">
      {/* Spline Scene */}
      <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-2xl">
        {splineSource ? (
          <Spline
            scene={splineSource}
            onLoad={onLoad}
            onError={onError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-800">
            <div className="text-white text-center">
              <p className="text-lg mb-2">No Spline source provided</p>
              <p className="text-sm text-slate-400">
                Please provide either splineUrl or splineFile
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-900/50 backdrop-blur-sm rounded-lg">
          <div className="text-white text-center p-4">
            <div className="text-red-400 text-lg mb-2">⚠️ Error</div>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {!isLoaded && !error && splineSource && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 rounded-lg">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading Spline scene...</p>
            <p className="text-sm text-slate-400 mt-1">
              {method === 'file' ? 'From local file' : 'From URL'}
            </p>
          </div>
        </div>
      )}

      {/* Demo Controls - Only show if loaded and no error */}
      {isLoaded && !error && (
        <div className="absolute top-4 left-4 space-y-2">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Demo Controls</h3>
            <div className="space-y-1">
              {[2, 3, 4, 5].map((layerNum) => (
                <button
                  key={layerNum}
                  className={`block w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                    hoveredLayer === layerNum
                      ? 'bg-blue-600 text-white'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                  onMouseEnter={() => handleLayerHover(layerNum)}
                  onMouseLeave={resetLayers}
                >
                  Hover Layer {layerNum}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Status Indicator */}
      {isLoaded && !error && (
        <div className="absolute top-4 right-4">
          <div className="bg-green-500/20 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">
                Scene Loaded ({method.toUpperCase()})
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-4 text-center text-slate-300">
        <p className="text-sm">
          {isLoaded && !error
            ? 'Use the demo controls above to test the opacity transitions, or hover over your Spline objects directly'
            : error
            ? 'Fix the error above to continue'
            : 'Loading your Spline scene...'
          }
        </p>
        {isTransitioning && (
          <p className="text-xs text-blue-400 mt-1">
            Transitioning layers...
          </p>
        )}
      </div>
    </div>
  )
}
