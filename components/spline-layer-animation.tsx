'use client'

import { useState, useEffect, useRef } from 'react'
import Spline from '@splinetool/react-spline'

interface SplineLayerAnimationProps {
  splineUrl: string
}

export default function SplineLayerAnimation({ splineUrl }: SplineLayerAnimationProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [timeoutReached, setTimeoutReached] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null)
  const [splineApp, setSplineApp] = useState<any>(null)
  
  // Layer names from your scene (in order from top to bottom)
  const layerNames = ['Monitor', 'UI', 'Puzzle', 'Framework', 'Cloud']
  const opacityLayerName = 'OverlayViel'

  useEffect(() => {
    setIsClient(true)
  }, [])

  const onLoad = (app: any) => {
    setIsLoaded(true)
    setError(null)
    setSplineApp(app)
    console.log('Spline scene loaded successfully!')
    console.log('Spline app object:', app)
    
    // Wait a bit for the scene to fully load
    setTimeout(() => {
      console.log('=== DEBUGGING SPLINE OBJECTS ===')
      
      // Test different ways to find objects
      if (app) {
        console.log('Available methods on app:', Object.keys(app))
        
        // Try findObjectByName
        if (app.findObjectByName) {
          console.log('Testing findObjectByName...')
          const allObjects = [...layerNames, opacityLayerName]
          allObjects.forEach(name => {
            const obj = app.findObjectByName(name)
            console.log(`Object "${name}":`, obj ? 'Found' : 'Not found')
            if (obj) {
              console.log(`  - Type: ${obj.type}`)
              console.log(`  - Visible: ${obj.visible}`)
              console.log(`  - Material:`, obj.material)
              console.log(`  - Position:`, obj.position)
              console.log(`  - Scale:`, obj.scale)
            }
          })
        }
        
        // Try accessing objects directly
        if (app.objects) {
          console.log('Available objects:', app.objects)
        }
        
        // Try scene property
        if (app.scene) {
          console.log('Scene object:', app.scene)
          if (app.scene.children) {
            console.log('Scene children:', app.scene.children.map((child: any) => child.name))
          }
        }
        
        // Try to find objects by traversing the scene
        if (app.scene && app.scene.traverse) {
          console.log('Traversing scene...')
          app.scene.traverse((child: any) => {
            if (child.name && layerNames.includes(child.name)) {
              console.log(`Found layer object: ${child.name}`, child)
            }
          })
        }
      }
    }, 1000) // Wait 1 second for scene to load
  }

  // Set up timeout to break loading loop
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isLoaded && !error) {
        console.log('Loading timeout reached - breaking loop')
        setTimeoutReached(true)
        setError('Loading timeout - the scene took too long to load.')
      }
    }, 8000)

    return () => clearTimeout(timeout)
  }, [isLoaded, error])

  const onError = (error: any) => {
    console.error('Spline loading error:', error)
    setError(`Failed to load scene: ${error.message || 'Unknown error'}`)
  }

  // Handle layer hover
  const handleLayerHover = (layerIndex: number) => {
    if (!splineApp || !isLoaded) return
    
    setHoveredLayer(layerIndex)
    console.log(`Hovering over layer ${layerIndex + 1}: ${layerNames[layerIndex]}`)
    
    // Apply opacity to layers above the hovered layer
    for (let i = 0; i < layerIndex; i++) {
      const layerName = layerNames[i]
      const layer = splineApp.findObjectByName(layerName)
      
      if (layer && layer.material) {
        // Set opacity to 0.3 (30% opacity)
        layer.material.opacity = 0.3
        layer.material.transparent = true
        layer.material.needsUpdate = true
        console.log(`Set ${layerName} opacity to 0.3`)
      }
    }
  }

  // Handle layer leave
  const handleLayerLeave = () => {
    if (!splineApp || !isLoaded) return
    
    setHoveredLayer(null)
    console.log('Left layer hover - resetting all opacities')
    
    // Reset all layers to full opacity
    layerNames.forEach(layerName => {
      const layer = splineApp.findObjectByName(layerName)
      
      if (layer && layer.material) {
        layer.material.opacity = 1.0
        layer.material.transparent = true
        layer.material.needsUpdate = true
        console.log(`Reset ${layerName} opacity to 1.0`)
      }
    })
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
                setError('Loading manually stopped')
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

      {/* Layer Controls */}
      {isLoaded && !error && (
        <div className="absolute bottom-4 left-4">
          <div className="bg-blue-500/20 backdrop-blur-sm rounded-lg p-4">
            <h3 className="text-blue-400 font-medium mb-3">Layer Controls</h3>
            <div className="space-y-2">
              {layerNames.map((layerName, index) => (
                <button
                  key={layerName}
                  onMouseEnter={() => handleLayerHover(index)}
                  onMouseLeave={handleLayerLeave}
                  className={`block w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                    hoveredLayer === index
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-500/30 text-blue-200 hover:bg-blue-500/50'
                  }`}
                >
                  Layer {index + 1}: {layerName}
                  {hoveredLayer === index && (
                    <span className="ml-2 text-xs">(Hovering)</span>
                  )}
                </button>
              ))}
            </div>
            <div className="mt-3 text-xs text-blue-300">
              <p>Hover over a layer to see opacity effect</p>
              <p>Layers above will become semi-transparent</p>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-4 text-center text-slate-300">
        <p className="text-sm">
          {isLoaded && !error
            ? 'Layer animation is ready! Hover over the layer buttons to test the opacity effects.'
            : error
            ? 'Fix the error above to continue'
            : 'Loading your Spline scene...'
          }
        </p>
      </div>
    </div>
  )
}
