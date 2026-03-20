"use client";

import { AboutHeadline } from "@/components/about-headline";
import { useInView } from "@/hooks/use-in-view";

const STAGGER_MS = 80;

type AboutSectionProps = {
	/**
	 * When true, adds a top gradient so the section fades from black (terrain) into #0a0a0f while scrolling.
	 */
	withTerrainTopBlend?: boolean;
};

export function AboutSection({ withTerrainTopBlend = false }: AboutSectionProps) {
	const { ref, inView } = useInView(0.1);

	const stagger = (i: number, baseClassName: string) => ({
		className: `${baseClassName} ${inView ? "animate-[fade-in-up_0.6s_ease-out_both]" : "opacity-0"}`,
		style: inView ? { animationDelay: `${i * STAGGER_MS}ms` } : undefined,
	});

	return (
		<section
			id="about"
			ref={ref}
			className="relative isolate overflow-hidden bg-[#0a0a0f] px-6 py-24 md:py-32"
		>
			{withTerrainTopBlend ? (
				<div
					className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-40 md:h-52"
					style={{
						background:
							"linear-gradient(to bottom, #000000 0%, rgba(10, 10, 15, 0.85) 55%, transparent 100%)",
					}}
					aria-hidden
				/>
			) : null}
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.16]"
				style={{
					backgroundImage:
						'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.18) 1px, transparent 0)',
					backgroundSize: '18px 18px',
				}}
			/>
			<div className="relative z-[3] mx-auto max-w-4xl">
				<p
					{...stagger(
						0,
						"mb-4 text-sm font-medium uppercase tracking-widest text-blue-400"
					)}
				>
					About
				</p>
				<AboutHeadline
					inView={inView}
					headlineProps={stagger(
						1,
						"mb-8 flex flex-col items-start text-3xl font-bold md:text-5xl"
					)}
				/>
				<p
					{...stagger(
						2,
						"mb-6 text-lg leading-relaxed text-gray-400 md:text-xl"
					)}
				>
					I&apos;m a software engineer who cares deeply about craft — from the
					architecture that holds a system together to the interface that makes
					it feel effortless. I focus on building scalable, well-tested software
					that solves real problems.
				</p>
				<p
					{...stagger(
						3,
						"mb-12 text-lg leading-relaxed text-gray-400 md:text-xl"
					)}
				>
					Whether it&apos;s designing APIs, shipping production frontends, or
					exploring new tools and frameworks, I bring curiosity and rigor to
					everything I build.
				</p>
				<div className="grid grid-cols-1 gap-8 border-t border-white/10 pt-12 sm:grid-cols-3">
					<div {...stagger(4, "")}>
						<p className="mb-1 text-3xl font-bold text-white">5+</p>
						<p className="text-sm text-gray-500">Years of experience</p>
					</div>
					<div {...stagger(5, "")}>
						<p className="mb-1 text-3xl font-bold text-white">Full-Stack</p>
						<p className="text-sm text-gray-500">End-to-end delivery</p>
					</div>
					<div {...stagger(6, "")}>
						<p className="mb-1 text-3xl font-bold text-white">Open Source</p>
						<p className="text-sm text-gray-500">Community contributor</p>
					</div>
				</div>
			</div>
		</section>
	);
}
