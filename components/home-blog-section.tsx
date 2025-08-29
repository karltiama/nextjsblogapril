"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { sortPosts } from "@/components/lib/utils";
import { posts } from "#site/content";
import { PostItem } from "@/components/post-item";

export function HomeBlogSection() {
	const latestPosts = sortPosts(posts.filter((post) => post.published)).slice(0, 3);

	return (
		<motion.section 
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-100px" }}
			transition={{ delay: 0.05, duration: 0.25 }}
			className="container max-w-4xl py-6 lg:lg:py-10 flex flex-col space-y-10 mt-30 justify-between items-center"
		>
			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				whileInView={{ opacity: 1, scale: 1 }}
				viewport={{ once: true }}
				transition={{ delay: 0.1, duration: 0.2 }}
			>
				<Image
					className=""
					width={200}
					height={200}
					src="/firmware.svg"
					alt="Illustration of a person working on firmware"
					loading="lazy"
				/>
			</motion.div>
			<motion.h2 
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ delay: 0.15, duration: 0.2 }}
				className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center"
			>
				Rebuild your mental model
			</motion.h2>
			<motion.p 
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ delay: 0.2, duration: 0.2 }}
				className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl text-balance text-center"
			>
				Breaking down front-end development makes learning more structured and
				predictable by understanding the fundamental workings of its
				components. In my blog, I share strategies for dissecting problems and
				describe my mental model for learning specific topics.
			</motion.p>
			<motion.ul 
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ delay: 0.25, duration: 0.2 }}
				className="flex flex-col w-full max-w-3xl"
			>
				{latestPosts.map((post) => (
					<li key={post.slug} className="first:border-t first:border-border">
						<PostItem
							slug={post.slug}
							title={post.title}
							description={post.description}
							date={post.date}
							tags={post.tags}
						/>
					</li>
				))}
			</motion.ul>
		</motion.section>
	);
}
