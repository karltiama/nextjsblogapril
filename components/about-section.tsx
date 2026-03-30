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
					I specialize in dissecting the architecture that holds a system 
					together and the mental models that make it legible. I build software 
					that isn&apos;t just scalable, but defensible — where every technical 
					trade-off is intentional.
				</p>
				<p
					{...stagger(
						3,
						"mb-12 text-lg leading-relaxed text-gray-400 md:text-xl"
					)}
				>
					Whether I&apos;m designing APIs, shipping production frontends, or 
					writing about engineering systems, I bring curiosity and rigor to 
					everything I build.
				</p>
				<div className="grid grid-cols-1 gap-8 border-t border-white/10 pt-12 sm:grid-cols-3">
					<div {...stagger(4, "")}>
						<p className="mb-1 text-3xl font-bold text-white tracking-tight">30+</p>
						<p className="text-sm text-gray-500 uppercase tracking-widest">Articles Written</p>
						<p className="mt-1 text-xs text-blue-400/80 italic font-medium">Shared mental models</p>
					</div>
					<div {...stagger(5, "")}>
						<p className="mb-1 text-3xl font-bold text-white tracking-tight">First Principles</p>
						<p className="text-sm text-gray-500 uppercase tracking-widest">Foundation</p>
						<p className="mt-1 text-xs text-blue-400/80 italic font-medium">System-wide thinking</p>
					</div>
					<div {...stagger(6, "")}>
						<p className="mb-1 text-3xl font-bold text-white tracking-tight">Architecture-First</p>
						<p className="text-sm text-gray-500 uppercase tracking-widest">Strategy</p>
						<p className="mt-1 text-xs text-blue-400/80 italic font-medium">Design before code</p>
					</div>
				</div>
			</div>
		</section>
	);
}
