/**
 * LayeredStackDemo — three full-size stacked copies of the same SVG.
 * Asset: /public/viewportiso.svg → `/viewportiso.svg`
 */

export const SVG_SRC = "/viewportiso.svg" as const

export const WRAPPER_WIDTH = 520
export const WRAPPER_HEIGHT = 420

/* ═══════════════════════════════════════════════════════════════════════════
 * Hover zone tuning (px, full-width bands — overlap Zone 2 up into Zone 1 for
 * a smoother handoff; Zone 2 is stacked above so it wins in the overlap).
 * Expand hit areas with ZONE_PADDING without changing the core top/height you
 * dial in against the isometric art.
 * ═══════════════════════════════════════════════════════════════════════════ */

/** When true: semi-transparent fills + outlines on zones. When false: invisible but still clickable. */
export const DEBUG = true

/**
 * Grows each zone on every side (px). Applied to full-width rects: vertical
 * expansion shifts top/height; horizontal expansion uses negative left + extra width.
 */
export const ZONE_PADDING = 10

/** Reveal layer 2 — align to the exposed middle plate in the browser. */
export const ZONE_1_TOP = 56
export const ZONE_1_HEIGHT = 208

/** Reveal layer 3 — should sit lower and overlap zone 1 slightly. */
export const ZONE_2_TOP = 200
export const ZONE_2_HEIGHT = 220

/* ─── Vertical motion (layer index: 0 = top, 1 = middle, 2 = bottom) ─── */

export const Y_COLLAPSED: readonly [number, number, number] = [0, 36, 72]

export const Y_ACTIVE_1: readonly [number, number, number] = [-58, 36, 72]

export const Y_ACTIVE_2: readonly [number, number, number] = [-108, -28, 72]

export type ActiveLayer = null | 1 | 2

export function getLayerY(layer: 0 | 1 | 2, activeLayer: ActiveLayer): number {
  if (activeLayer === null) return Y_COLLAPSED[layer]
  if (activeLayer === 1) return Y_ACTIVE_1[layer]
  return Y_ACTIVE_2[layer]
}

export const MOTION_TRANSITION = {
  type: "spring" as const,
  stiffness: 400,
  damping: 32,
}
