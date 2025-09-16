'use client'

import { useRef, useEffect, useState } from 'react'
import Spline from '@splinetool/react-spline/next'

interface SplineOpacityDemoProps {
  splineUrl?: string
}

export default function SplineOpacityDemo({ 
  splineUrl = 'https://prod.spline.design/6Wc1Q7YGyM-iab9p/scene.splinecode' // Placeholder URL
}: SplineOpacityDemoProps) {
  const splineRef = useRef<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null)

  // Layer names - you'll need to update these based on your actual Spline scene
  const layerNames = [
    'Layer1', // Top layer
    'Layer2', // Second layer
    'Layer3', // Third layer
    'Layer4', // Fourth layer
    'Layer5', // Fifth layer
    'OpacityLayer' // Opacity layer
  ]

  const onLoad = (splineApp: any) => {
    splineRef.current = splineApp
    setIsLoaded(true)
    console.log('Spline scene loaded successfully')
  }

  const onError = (error: any) => {
    console.error('Spline loading error:', error)
  }

  // Function to set layer opacity
  const setLayerOpacity = (layerName: string, opacity: number) => {
    if (!splineRef.current) return

    try {
      const object = splineRef.current.findObjectByName(layerName)
      if (object && object.material) {
        object.material.opacity = opacity
        object.material.transparent = opacity < 1
        object.material.needsUpdate = true
      }
    } catch (error) {
      console.warn(`Could not find layer: ${layerName}`, error)
    }
  }

  // Function to handle layer hover
  const handleLayerHover = (layerIndex: number) => {
    if (!isLoaded) return

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
      setLayerOpacity(layerName, 0.3) // Set to semi-transparent
    }
  }

  // Function to reset all layers to normal opacity
  const resetLayers = () => {
    if (!isLoaded) return

    setHoveredLayer(null)
    
    // Reset all layers to full opacity
    layerNames.forEach((layerName, index) => {
      if (index < layerNames.length - 1) { // Don't modify the opacity layer itself
        setLayerOpacity(layerName, 1)
      }
    })
  }

  // Set up event listeners for layer hover detection
  useEffect(() => {
    if (!isLoaded || !splineRef.current) return

    // This is a simplified approach - in a real implementation, you'd need to
    // set up proper event listeners on your Spline objects
    console.log('Setting up layer hover detection...')
    
    // For now, we'll use a demo approach with buttons
    // In your actual implementation, you'll need to configure the Spline scene
    // to emit events when objects are hovered
  }, [isLoaded])

  return (
    <div className="relative">
      {/* Spline Scene */}
      <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-2xl">
        <Spline
          scene={splineUrl}
          onLoad={onLoad}
          onError={onError}
        />
      </div>

      {/* Demo Controls - Remove these when you have your actual Spline scene */}
      {isLoaded && (
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

      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 rounded-lg">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading Spline scene...</p>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-4 text-center text-slate-300">
        <p className="text-sm">
          {isLoaded 
            ? 'Use the demo controls above to test the opacity transitions, or hover over your Spline objects directly'
            : 'Replace the placeholder URL with your actual Spline scene URL'
          }
        </p>
      </div>
    </div>
  )
}
