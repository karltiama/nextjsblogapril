import type { SpringConfig } from '@react-spring/core'

/** Vertical spacing between layer centers when fully collapsed (Y-up world). */
export const BASE_SPACING = 0.22

/** Base unit for lift offsets; tune with multipliers below. */
export const LIFT_STEP = 0.35

/** When `hoveredIndex === 1`, top layer lifts slightly (middle is hovered). */
export const LIFT_TOP_ON_HOVER_MIDDLE = LIFT_STEP * 1.85

/** When `hoveredIndex === 2`, top layer lifts more. */
export const LIFT_TOP_ON_HOVER_BOTTOM = LIFT_STEP * 3.5

/** When `hoveredIndex === 2`, middle layer (index 1) lifts slightly. */
export const LIFT_MIDDLE_ON_HOVER_BOTTOM = LIFT_STEP * 1.5

/** Subtle scale pop on hovered interactive layers (1 and 2 only). */
export const HOVER_HIGHLIGHT_SCALE = 1.06

export const SPRING_CONFIG: SpringConfig = {
  tension: 280,
  friction: 32,
  mass: 0.8,
}

/** GLB under `public/glb/`. */
export const STACK_GLB_URL = '/glb/UIani2.glb'

/** Invisible pointer hit planes (world units); separate from GLB visuals. */
export const HIT_PLANE_WIDTH = 3.2
export const HIT_PLANE_HEIGHT = 1.35
/**
 * Slight Z offsets toward the camera so stacked billboards resolve predictably
 * (closer = tested first). Top shield is foremost so “top only” clears hover.
 */
export const HIT_Z_LAYER_TOP = 0.38
export const HIT_Z_LAYER_MIDDLE = 0.22
export const HIT_Z_LAYER_BOTTOM = 0.06
