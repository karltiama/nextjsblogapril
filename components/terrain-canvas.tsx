'use client'

import {
  createTerrainUniforms,
  TERRAIN_FRAGMENT_SHADER,
  TERRAIN_VERTEX_SHADER,
} from '@/components/terrain-shaders'
import { Canvas, useFrame } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

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

/** Cap devicePixelRatio: 1.5 is near-indistinguishable from 2 here but ~44% fewer pixels to shade. */
const DESKTOP_DPR: [number, number] = [1, 1.5]
const LOW_END_DPR: [number, number] = [1, 1]

function useTerrainQuality() {
  const [segments, setSegments] = useState<[number, number]>(DESKTOP_SEGMENTS)
  const [dpr, setDpr] = useState<[number, number]>(DESKTOP_DPR)

  useEffect(() => {
    const mobile = window.innerWidth < 768
    const lowCore = navigator.hardwareConcurrency <= 4
    setSegments(mobile ? MOBILE_SEGMENTS : DESKTOP_SEGMENTS)
    setDpr(mobile || lowCore ? LOW_END_DPR : DESKTOP_DPR)
  }, [])

  return { segments, dpr }
}

/**
 * Client-only WebGL layer for the terrain hero.
 *
 * Rendered as an absolutely positioned layer inside an already-sized parent so
 * that mounting (or not mounting, under reduced motion) never affects document
 * layout — this is what keeps CLS at ~0 while still shipping the animation.
 */
export default function TerrainCanvas() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)
  const [shown, setShown] = useState(false)
  const reduceMotion = useReducedMotion()
  const { segments, dpr } = useTerrainQuality()
  const animate = visible && !reduceMotion

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true))
    return () => cancelAnimationFrame(id)
  }, [])

  if (reduceMotion) return null

  return (
    <div
      ref={rootRef}
      className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
        shown ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <Canvas
        camera={{ position: [0, -10, 10], fov: 80 }}
        dpr={dpr}
        frameloop={animate ? 'always' : 'never'}
      >
        <fog attach="fog" args={['#000000', 8, 28]} />
        <Terrain segments={segments} animate={animate} />
      </Canvas>
    </div>
  )
}
