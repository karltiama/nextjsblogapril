"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Observes an element and sets inView when it crosses the viewport threshold.
 */
export function useInView(threshold = 0.1) {
	const ref = useRef<HTMLElement | null>(null);
	const [inView, setInView] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting) {
					setInView(true);
				}
			},
			{ threshold }
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, [threshold]);

	return { ref, inView };
}
