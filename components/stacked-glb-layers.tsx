'use client'

import { useGLTF, Clone, Billboard } from '@react-three/drei'
import { animated, useSpring } from '@react-spring/three'
import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { DoubleSide, Group, Mesh, Object3D } from 'three'
import {
  BASE_SPACING,
  HOVER_HIGHLIGHT_SCALE,
  HIT_PLANE_HEIGHT,
  HIT_PLANE_WIDTH,
  HIT_Z_LAYER_BOTTOM,
  HIT_Z_LAYER_MIDDLE,
  HIT_Z_LAYER_TOP,
  LIFT_MIDDLE_ON_HOVER_BOTTOM,
  LIFT_TOP_ON_HOVER_BOTTOM,
  LIFT_TOP_ON_HOVER_MIDDLE,
  SPRING_CONFIG,
  STACK_GLB_URL,
} from '@/components/stack-layers-constants'

useGLTF.preload(STACK_GLB_URL)

type HoveredLayer = null | 1 | 2

/**
 * Stack indices: 0 = top, 1 = middle, 2 = bottom (Y-up).
 *
 * hoveredIndex is driven only by R3F pointer events on invisible hit meshes.
 * GLB meshes do not participate in raycasting — interaction targets are separate.
 *
 * - null — collapsed stack (including while “top” shield is under the cursor)
 * - 1 — middle hit zone
 * - 2 — bottom hit zone
 */
function disableRaycastOnSubtree(root: Object3D | null) {
  if (!root) return
  root.traverse((o) => {
    if (o instanceof Mesh) {
      o.raycast = () => {}
    }
  })
}

export function StackedGlbLayers() {
  const { scene } = useGLTF(STACK_GLB_URL)

  const group0 = useRef<Group>(null)
  const group1 = useRef<Group>(null)
  const group2 = useRef<Group>(null)

  const [hoveredIndex, setHoveredIndex] = useState<HoveredLayer>(null)

  useLayoutEffect(() => {
    disableRaycastOnSubtree(group0.current)
    disableRaycastOnSubtree(group1.current)
    disableRaycastOnSubtree(group2.current)
  }, [scene])

  const springTargets = useMemo(() => {
    const y0Base = 2 * BASE_SPACING
    const y1Base = BASE_SPACING
    let y0 = y0Base
    let y1 = y1Base
    const y2 = 0
    let s0 = 1
    let s1 = 1
    let s2 = 1
    if (hoveredIndex === 1) {
      y0 = y0Base + LIFT_TOP_ON_HOVER_MIDDLE
      s1 = HOVER_HIGHLIGHT_SCALE
    } else if (hoveredIndex === 2) {
      y0 = y0Base + LIFT_TOP_ON_HOVER_BOTTOM
      y1 = y1Base + LIFT_MIDDLE_ON_HOVER_BOTTOM
      s2 = HOVER_HIGHLIGHT_SCALE
    }
    return { y0, y1, y2, s0, s1, s2 }
  }, [hoveredIndex])

  const { y0, y1, y2, s0, s1, s2 } = useSpring({
    ...springTargets,
    config: SPRING_CONFIG,
  })

  const yHitTop = 2 * BASE_SPACING
  const yHitMid = BASE_SPACING
  const yHitBot = 0

  return (
    <group>
      <animated.group
        ref={group0}
        position-y={y0}
        scale={s0.to((v) => [v, v, v] as [number, number, number])}
      >
        <Clone object={scene} />
      </animated.group>
      <animated.group
        ref={group1}
        position-y={y1}
        scale={s1.to((v) => [v, v, v] as [number, number, number])}
      >
        <Clone object={scene} />
      </animated.group>
      <animated.group
        ref={group2}
        position-y={y2}
        scale={s2.to((v) => [v, v, v] as [number, number, number])}
      >
        <Clone object={scene} />
      </animated.group>

      {/* Pointer targets only — not the GLB. Top shield enforces “layer 0 = no lift”. */}
      <group
        onPointerOut={(e) => {
          e.stopPropagation()
          setHoveredIndex(null)
        }}
      >
        <Billboard position={[0, yHitTop, HIT_Z_LAYER_TOP]}>
          <mesh
            renderOrder={100}
            onPointerEnter={(e) => {
              e.stopPropagation()
              setHoveredIndex(null)
            }}
            onPointerLeave={(e) => e.stopPropagation()}
          >
            <planeGeometry args={[HIT_PLANE_WIDTH, HIT_PLANE_HEIGHT]} />
            <meshBasicMaterial
              transparent
              opacity={0}
              depthWrite={false}
              side={DoubleSide}
            />
          </mesh>
        </Billboard>

        <Billboard position={[0, yHitMid, HIT_Z_LAYER_MIDDLE]}>
          <mesh
            renderOrder={101}
            onPointerEnter={(e) => {
              e.stopPropagation()
              setHoveredIndex(1)
            }}
            onPointerLeave={(e) => e.stopPropagation()}
          >
            <planeGeometry args={[HIT_PLANE_WIDTH, HIT_PLANE_HEIGHT * 1.05]} />
            <meshBasicMaterial
              transparent
              opacity={0}
              depthWrite={false}
              side={DoubleSide}
            />
          </mesh>
        </Billboard>

        <Billboard position={[0, yHitBot, HIT_Z_LAYER_BOTTOM]}>
          <mesh
            renderOrder={102}
            onPointerEnter={(e) => {
              e.stopPropagation()
              setHoveredIndex(2)
            }}
            onPointerLeave={(e) => e.stopPropagation()}
          >
            <planeGeometry args={[HIT_PLANE_WIDTH, HIT_PLANE_HEIGHT * 1.1]} />
            <meshBasicMaterial
              transparent
              opacity={0}
              depthWrite={false}
              side={DoubleSide}
            />
          </mesh>
        </Billboard>
      </group>
    </group>
  )
}
