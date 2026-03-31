import { ArrowRightIcon, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
	Tooltip,
	TooltipProvider,
	TooltipTrigger,
	TooltipContent,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";
import { cn } from "@/components/lib/utils";
import type { Project } from "@/lib/types";

function generateSlug(title: string) {
	return title.toLowerCase().replace(/\s+/g, '-');
}

function Project({
	title,
	description,
	imageSrc,
	altText,
	technologies,
	liveLink,
	githubRepo,
	featured = false,
	status = "Completed",
	reverseLayout = false,
}: Project & { reverseLayout?: boolean }) {


	return (
		<TooltipProvider>
			<div className="group relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center pb-20 md:pb-32">
				{/* Image "Card" */}
				<div 
					className={cn(
						"relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 group-hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] transition-shadow duration-500",
						reverseLayout ? "md:order-2" : "md:order-1"
					)}
				>
					<Image
						src={imageSrc}
						alt={altText}
						fill
						className="object-cover object-top"
						sizes="(max-width: 768px) 100vw, 50vw"
						priority={featured}
					/>
					


					{/* Image Hover Overlay */}
					<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
						<div className="flex gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
							{liveLink && (
								<Button size="sm" asChild className="bg-blue-400 text-black hover:bg-blue-500 border-none transition-colors rounded-lg">
									<Link href={liveLink as string} target="_blank" rel="noopener noreferrer">
										<ExternalLink className="w-4 h-4 mr-2" />
										Live Demo
									</Link>
								</Button>
							)}
							{githubRepo && (
								<Button size="sm" variant="outline" asChild className="backdrop-blur-md bg-white/10 border-white/20 text-white hover:bg-white/20 transition-colors rounded-lg">
									<Link href={githubRepo as string} target="_blank" rel="noopener noreferrer">
										<Github className="w-4 h-4 mr-2" />
										Source
									</Link>
								</Button>
							)}
						</div>
					</div>
				</div>
				
				{/* Content area */}
				<div className={cn(
					"flex flex-col space-y-6",
					reverseLayout ? "md:order-1 md:text-right md:items-end" : "md:order-2"
				)}>
					<div className={cn("space-y-2 w-fit", reverseLayout ? "ml-auto" : "")}>
						<h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors duration-300">
							{title}
						</h3>
						<div className={cn("h-1 w-12 bg-blue-400 rounded-full transition-all duration-500 ease-out group-hover:w-full", reverseLayout ? "ml-auto" : "")} />
					</div>

					<p className="text-gray-400 text-lg leading-relaxed max-w-xl">
						{description}
					</p>
					
					{/* Technology Stack */}
					<div className={cn("flex flex-wrap gap-3 pt-2", reverseLayout ? "justify-end" : "")}>
						{technologies.map((tech, index) => {
							const IconComponent = tech.icon;
							return (
								<Tooltip key={index} delayDuration={0}>
									<TooltipTrigger asChild>
										<div className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-blue-400/50 hover:bg-blue-400/10 transition-all duration-300 group/icon">
											<IconComponent className="w-5 h-5 text-gray-400 group-hover/icon:text-blue-400 transition-colors" />
										</div>
									</TooltipTrigger>
									<TooltipContent className="bg-gray-900 border-white/10 text-white text-xs">
										<p>{tech.name}</p>
									</TooltipContent>
								</Tooltip>
							);
						})}
					</div>
					
					{/* Action Buttons */}
					<div className="pt-4">
						<Link 
							href={`/projects/${generateSlug(title)}` as string}
							className="inline-flex items-center text-blue-400 font-bold tracking-wide uppercase text-sm hover:text-blue-300 transition-colors group/link"
						>
							Explore Case Study
							<ArrowRightIcon className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/link:translate-x-2" />
						</Link>
					</div>
				</div>
			</div>
		</TooltipProvider>
	);
}

export default Project;
