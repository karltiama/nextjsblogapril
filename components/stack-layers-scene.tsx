'use client'

import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { StackedGlbLayers } from '@/components/stacked-glb-layers'

export function StackLayersScene() {
  return (
    <div className="h-[min(85vh,720px)] w-full rounded-lg border border-white/10 bg-[#0a0a12]">
      <Canvas
        camera={{ position: [3.2, 2.4, 4.6], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#0a0a12']} />
        <ambientLight intensity={0.65} />
        <directionalLight position={[4, 6, 3]} intensity={1.15} />
        <directionalLight position={[-3, 2, -2]} intensity={0.35} />
        <Suspense fallback={null}>
          <StackedGlbLayers />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls
          enablePan
          minPolarAngle={0.35}
          maxPolarAngle={Math.PI / 2}
          minDistance={2.5}
          maxDistance={12}
          target={[0, 0.35, 0]}
        />
      </Canvas>
    </div>
  )
}
