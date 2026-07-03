'use client'

import { AboutSection } from '@/components/about-section'
import {
  createTerrainUniforms,
  TERRAIN_FRAGMENT_SHADER,
  TERRAIN_VERTEX_SHADER,
} from '@/components/terrain-shaders'
import { Canvas, useFrame } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

interface TerrainHeroProps {
  children?: React.ReactNode
  /** When true, uses min-h-screen for full-viewport landing pages */
  fullHeight?: boolean
}

const DESKTOP_SEGMENTS: [number, number] = [120, 90]
const MOBILE_SEGMENTS: [number, number] = [60, 45]
const FLYING_SPEED = 0.01

function Terrain({
  segments,
  animate,
}: {
  segments: [number, number]
  animate: boolean
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null!)

  const geom = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(80, 60, segments[0], segments[1])
    geometry.rotateX(-Math.PI / 2.6)
    return geometry
  }, [segments])

  const uniforms = useMemo(() => createTerrainUniforms(), [])

  useFrame(() => {
    if (!animate || !materialRef.current) return
    materialRef.current.uniforms.uTime.value += FLYING_SPEED
  })

  return (
    <mesh geometry={geom} position={[0, -1.2, 0]}>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={TERRAIN_VERTEX_SHADER}
        fragmentShader={TERRAIN_FRAGMENT_SHADER}
        wireframe
        transparent
      />
    </mesh>
  )
}

function useTerrainQuality() {
  const [segments, setSegments] = useState<[number, number]>(DESKTOP_SEGMENTS)
  const [dpr, setDpr] = useState<[number, number]>([1, 2])

  useEffect(() => {
    const mobile = window.innerWidth < 768
    const lowCore = navigator.hardwareConcurrency <= 4
    setSegments(mobile ? MOBILE_SEGMENTS : DESKTOP_SEGMENTS)
    setDpr(mobile || lowCore ? [1, 1] : [1, 2])
  }, [])

  return { segments, dpr }
}

export default function TerrainHero({ children, fullHeight }: TerrainHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)
  const reduceMotion = useReducedMotion()
  const { segments, dpr } = useTerrainQuality()
  const animate = visible && !reduceMotion

  useEffect(() => {
    const el = heroRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const heroHeightClass = fullHeight
    ? 'h-[100svh] min-h-[100svh]'
    : 'h-[600px]'

  const scrollBridgeClass = fullHeight
    ? '-mt-[100svh] pt-[84svh]'
    : '-mt-[600px] pt-[600px]'

  return (
    <div className="relative w-full">
      <div
        ref={heroRef}
        className={`sticky top-0 z-0 w-full overflow-hidden bg-black ${heroHeightClass}`}
      >
        {!reduceMotion ? (
          <div className="absolute inset-0 pointer-events-none">
            <Canvas
              camera={{ position: [0, -10, 10], fov: 80 }}
              dpr={dpr}
              frameloop={animate ? 'always' : 'never'}
            >
              <fog attach="fog" args={['#000000', 8, 28]} />
              <Terrain segments={segments} animate={animate} />
            </Canvas>
          </div>
        ) : null}

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center px-0.5 pointer-events-auto z-10">
            {children || (
              <>
                <h1 className="text-5xl md:text-7xl font-bold text-blue-400 mb-6 drop-shadow-lg">
                  Hi I&apos;m Karl
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 drop-shadow-md max-w-3xl mx-auto">
                  I build scalable systems and data-driven applications that solve real problems.
                </p>
              </>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-b from-transparent to-black pointer-events-none z-20" />
      </div>

      <div className={`relative z-10 ${scrollBridgeClass}`}>
        <div
          className="pointer-events-none h-10"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, #0a0a0f 100%)',
          }}
          aria-hidden
        />
        <AboutSection />
      </div>
    </div>
  )
}
