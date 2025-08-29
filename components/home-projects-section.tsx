"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import ProjectList from "@/components/project-list";

export function HomeProjectsSection() {
	return (
		<motion.section 
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-100px" }}
			transition={{ delay: 0.1, duration: 0.25 }}
			className="container max-w-6xl py-6 lg:lg:py-10 flex flex-col space-y-10 mt-60"
		>
			<motion.h2 
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ delay: 0.15, duration: 0.2 }}
				className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center"
			>
				My Projects
			</motion.h2>
			<motion.p 
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ delay: 0.2, duration: 0.2 }}
				className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl text-balance text-center"
			>
				Here are some of the projects I have worked on. I am always looking
				forward to new projects and collaborations.
			</motion.p>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ delay: 0.25, duration: 0.2 }}
			>
				<Suspense fallback={<div>Loading projects...</div>}>
					<ProjectList />
				</Suspense>
			</motion.div>
		</motion.section>
	);
}
