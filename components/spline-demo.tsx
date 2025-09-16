'use client'

import { useState, useEffect } from 'react'
import Spline from '@splinetool/react-spline'

export default function SplineDemo() {
  const [isClient, setIsClient] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const onLoad = () => {
    setIsLoaded(true)
    setError(null)
    console.log('Spline scene loaded successfully!')
  }

  const onError = (error: any) => {
    console.error('Spline loading error:', error)
    setError('Failed to load 3D scene')
  }

  if (!isClient) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-gray-600">Loading 3D scene...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full h-96 bg-red-50 border border-red-200 rounded-lg flex items-center justify-center">
        <div className="text-red-600 text-center">
          <p className="font-semibold">Failed to load 3D scene</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden border border-gray-200 shadow-lg">
      <Spline
        scene="https://prod.spline.design/0tc5vcx8upINop77/scene.splinecode"
        onLoad={onLoad}
        onError={onError}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
