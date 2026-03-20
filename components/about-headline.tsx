"use client";

type HeadlineProps = {
	className?: string;
	style?: React.CSSProperties;
};

/**
 * Headline block; outer animation comes from parent `stagger(...)` via `headlineProps`.
 */
export function AboutHeadline({
	inView: _inView,
	headlineProps,
}: {
	inView: boolean;
	headlineProps: HeadlineProps;
}) {
	return (
		<div {...headlineProps}>
			<span className="block">Software that scales.</span>
			<span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
				Interfaces that feel effortless.
			</span>
		</div>
	);
}
