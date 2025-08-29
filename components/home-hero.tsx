"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn, sortPosts } from "@/components/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { posts } from "#site/content";
import { AnimatedTechStack } from "@/components/ui/animated-tech-stack";

const techStack = [
	"React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", 
	"Supabase", "PostgreSQL", "REST APIs", "Git", "Docker"
];

export function HomeHero() {
	return (
		<section className="min-h-screen md:pb-12 md:mt-10 lg:py-28">
			<div className="container grid grid-cols-1 lg:grid-cols-3 gap-4 text-center">
				{/* Left Column */}
				<motion.div 
					initial={{ opacity: 0, x: -50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.05, duration: 0.25 }}
					className="hidden lg:flex flex-col gap-4 items-center justify-between"
				>
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.1, duration: 0.2 }}
					>
						<Image
							width={200}
							height={200}
							src="/programming.svg"
							alt="Illustration of a person programming"
							loading="lazy"
						/>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.15, duration: 0.2 }}
					>
						<Image
							width={200}
							height={200}
							src="/visual_data.svg"
							alt="Illustration of a person visualizing data"
							loading="lazy"
						/>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.2, duration: 0.2 }}
					>
						<Image
							width={200}
							height={200}
							src="/biking.svg"
							alt="Illustration of a person biking"
							loading="lazy"
						/>
					</motion.div>
				</motion.div>
				{/* Center Column */}
				<div className="flex flex-col gap-6 items-center pt-20">
					<motion.div
						initial={{ opacity: 0, scale: 0.8, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						transition={{ delay: 0.02, duration: 0.2 }}
					>
						<Image
							width={200}
							height={200}
							src="/drink_coffee.svg"
							alt="Illustration of a person drinking coffee"
						/>
					</motion.div>
					<motion.div 
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.08, duration: 0.2 }}
						className="space-y-2"
					>
						<h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-balance">
							Hi, I&apos;m Karl
						</h1>
						<p className="text-lg text-muted-foreground">
							Full-Stack Developer
						</p>
					</motion.div>
					<motion.p 
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.14, duration: 0.2 }}
						className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl text-balance"
					>
						I specialize in the React ecosystem and modern web technologies, 
						with a passion for creating user-focused applications and sharing 
						knowledge through technical writing.
					</motion.p>
					
					{/* Tech Stack Display */}
					<AnimatedTechStack techs={techStack} />

					<motion.div 
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2, duration: 0.2 }}
						className="flex flex-col gap-4 justify-center sm:flex-row"
					>
						<Link
							href="/projects"
							className={cn(
								buttonVariants({ size: "lg" }),
								"w-full sm:w-fit hover:scale-105 transition-transform duration-200"
							)}>
							View My Projects
						</Link>
						<Link
							href="/about"
							className={cn(
								buttonVariants({ variant: "outline", size: "lg" }),
								"w-full sm:w-fit hover:scale-105 transition-transform duration-200"
							)}>
							About Me
						</Link>
						<Link
							href={siteConfig.links.github}
							target="_blank"
							rel="noreferrer"
							className={cn(
								buttonVariants({ variant: "outline", size: "lg" }),
								"w-full sm:w-fit hover:scale-105 transition-transform duration-200"
							)}>
							GitHub
						</Link>
					</motion.div>
				</div>
				{/* Right Column */}
				<motion.div 
					initial={{ opacity: 0, x: 50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.05, duration: 0.25 }}
					className="hidden lg:flex flex-col gap-4 items-center justify-between"
				>
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.1, duration: 0.2 }}
					>
						<Image
							width={200}
							height={200}
							src="/building_website.svg"
							alt="Illustration of a person building a website"
							loading="lazy"
						/>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.15, duration: 0.2 }}
					>
						<Image
							width={200}
							height={200}
							src="/hacker_mind.svg"
							alt="Illustration of a person hacking"
							loading="lazy"
						/>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.2, duration: 0.2 }}
					>
						<Image
							width={200}
							height={200}
							src="/running.svg"
							alt="Illustration of a person running"
							loading="lazy"
						/>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
