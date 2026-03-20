"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const ABOUT_HEADLINE_SUFFIXES = [
	"solve real-world problems.",
	"scale with users.",
	"actually get used.",
] as const;

const ABOUT_HEADLINE_INTERVAL_MS = 3800;

/**
 * Rotating About headline with reduced-motion fallback.
 */
export function AboutHeadline({
	inView,
	headlineProps,
}: {
	inView: boolean;
	headlineProps: { className: string; style?: React.CSSProperties };
}) {
	const [suffixIndex, setSuffixIndex] = useState(0);
	const reduceMotion = useReducedMotion();

	useEffect(() => {
		if (!inView || reduceMotion) return;
		const id = window.setInterval(() => {
			setSuffixIndex((i) => (i + 1) % ABOUT_HEADLINE_SUFFIXES.length);
		}, ABOUT_HEADLINE_INTERVAL_MS);
		return () => window.clearInterval(id);
	}, [inView, reduceMotion]);

	const suffix = ABOUT_HEADLINE_SUFFIXES[reduceMotion ? 0 : suffixIndex];

	return (
		<h2 {...headlineProps}>
			<span className="block leading-tight text-white">Building things that</span>
			{reduceMotion ? (
				<span className="mt-1 block min-h-[2lh] leading-tight text-blue-400 md:mt-2">
					{suffix}
				</span>
			) : (
				<span
					className="mt-1 block min-h-[2lh] leading-tight text-blue-400 md:mt-2"
					aria-live="polite"
				>
					<AnimatePresence mode="wait" initial={false}>
						<motion.span
							key={suffix}
							className="block"
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -8 }}
							transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
						>
							{suffix}
						</motion.span>
					</AnimatePresence>
				</span>
			)}
			<span className="sr-only">
				{ABOUT_HEADLINE_SUFFIXES.join(" ")}
			</span>
		</h2>
	);
}
