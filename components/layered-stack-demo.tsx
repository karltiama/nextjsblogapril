"use client"

/**
 * Hover tuning lives in `layered-stack-demo-constants.ts` (single place):
 * DEBUG, ZONE_PADDING, ZONE_1_TOP, ZONE_1_HEIGHT, ZONE_2_TOP, ZONE_2_HEIGHT
 */

import { motion } from "framer-motion"
import { useState } from "react"
import {
  DEBUG,
  MOTION_TRANSITION,
  SVG_SRC,
  WRAPPER_HEIGHT,
  WRAPPER_WIDTH,
  ZONE_1_HEIGHT,
  ZONE_1_TOP,
  ZONE_2_HEIGHT,
  ZONE_2_TOP,
  ZONE_PADDING,
  getLayerY,
  type ActiveLayer,
} from "./layered-stack-demo-constants"

/* ─── Stack visuals (same SVG ×3) — motion values live in constants file ─── */

/** Paint bottom → middle → top so the top plate occludes correctly. */
const PLATES: readonly {
  layer: 0 | 1 | 2
  label: "top" | "middle" | "bottom"
  zIndex: number
  opacity: number
  filter: string
}[] = [
  {
    layer: 2,
    label: "bottom",
    zIndex: 0,
    opacity: 0.78,
    filter:
      "brightness(0.92) saturate(1.08) drop-shadow(0 18px 28px rgb(0 0 0 / 0.5))",
  },
  {
    layer: 1,
    label: "middle",
    zIndex: 1,
    opacity: 0.9,
    filter: "brightness(0.97) drop-shadow(0 14px 22px rgb(0 0 0 / 0.42))",
  },
  {
    layer: 0,
    label: "top",
    zIndex: 2,
    opacity: 0.98,
    filter: "brightness(1.02) drop-shadow(0 10px 18px rgb(0 0 0 / 0.38))",
  },
]

/** Full-width hit area: ZONE_PADDING expands the box; left offset keeps it centered on the stack. */
function zoneStyle(baseTop: number, baseHeight: number) {
  const p = ZONE_PADDING
  return {
    top: baseTop - p,
    height: baseHeight + 2 * p,
    left: -p,
    width: WRAPPER_WIDTH + 2 * p,
  } as const
}

/**
 * Two full-width overlapping hover bands (pixel top/height from constants).
 * Zone 2 renders above zone 1 so the deeper reveal wins in the overlap.
 */
export function LayeredStackDemo() {
  const [activeLayer, setActiveLayer] = useState<ActiveLayer>(null)

  const zone1Class = DEBUG
    ? "border-2 border-blue-500 bg-blue-500/25"
    : "bg-transparent"
  const zone2Class = DEBUG
    ? "border-2 border-green-500 bg-green-500/25"
    : "bg-transparent"

  return (
    <div
      className="relative isolate select-none"
      style={{ width: WRAPPER_WIDTH, height: WRAPPER_HEIGHT }}
      onMouseLeave={() => setActiveLayer(null)}
    >
      {PLATES.map((plate) => (
        <motion.div
          key={plate.label}
          className="pointer-events-none absolute inset-0"
          style={{ zIndex: plate.zIndex }}
          initial={false}
          animate={{ y: getLayerY(plate.layer, activeLayer) }}
          transition={MOTION_TRANSITION}
        >
          <img
            src={SVG_SRC}
            alt=""
            width={WRAPPER_WIDTH}
            height={WRAPPER_HEIGHT}
            draggable={false}
            className="absolute left-0 top-0 h-full w-full object-cover"
            style={{
              opacity: plate.opacity,
              filter: plate.filter,
            }}
          />
        </motion.div>
      ))}

      <div
        className="pointer-events-none absolute inset-0"
        style={{ zIndex: 10 }}
        aria-hidden
      >
        <div
          className={`pointer-events-auto absolute ${zone1Class}`}
          style={{ ...zoneStyle(ZONE_1_TOP, ZONE_1_HEIGHT), zIndex: 1 }}
          onMouseEnter={() => setActiveLayer(1)}
        />
        <div
          className={`pointer-events-auto absolute ${zone2Class}`}
          style={{ ...zoneStyle(ZONE_2_TOP, ZONE_2_HEIGHT), zIndex: 2 }}
          onMouseEnter={() => setActiveLayer(2)}
        />
      </div>
    </div>
  )
}
