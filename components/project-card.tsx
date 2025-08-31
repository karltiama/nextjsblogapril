import { ArrowRightIcon, ExternalLink, Github, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
	Tooltip,
	TooltipProvider,
	TooltipTrigger,
	TooltipContent,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
}: Project) {
	const statusColors = {
		"Live": "bg-green-500/10 text-green-700 border-green-200",
		"In Development": "bg-yellow-500/10 text-yellow-700 border-yellow-200",
		"Completed": "bg-blue-500/10 text-blue-700 border-blue-200",
		"Refactoring v2": "bg-purple-500/10 text-purple-700 border-purple-200",
		"Archived": "bg-gray-500/10 text-gray-700 border-gray-200"
	};

	return (
		<TooltipProvider>
			<div className="bg-background rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl h-full flex flex-col w-full relative">
				{/* Featured Badge */}
				{featured && (
					<div className="absolute top-4 left-4 z-10">
						<Badge className="bg-primary/90 text-primary-foreground">
							<Star className="w-3 h-3 mr-1" />
							Featured
						</Badge>
					</div>
				)}
				
				{/* Status Badge */}
				<div className="absolute top-4 right-4 z-10">
					<Badge className={statusColors[status]}>
						{status}
					</Badge>
				</div>

				<div className="relative w-full pb-[56.25%]">
					<Image
						src={imageSrc}
						alt={altText}
						fill
						className="absolute top-0 left-0 w-full h-full object-cover group-hover:opacity-80 transition-opacity"
					/>
					{/* Overlay on hover */}
					<div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
						<div className="flex gap-2">
							{liveLink && (
								<Button size="sm" asChild>
									<Link href={liveLink} target="_blank" rel="noopener noreferrer">
										<ExternalLink className="w-4 h-4 mr-1" />
										Live Demo
									</Link>
								</Button>
							)}
							{githubRepo && (
								<Button size="sm" variant="outline" asChild>
									<Link href={githubRepo} target="_blank" rel="noopener noreferrer">
										<Github className="w-4 h-4 mr-1" />
										Code
									</Link>
								</Button>
							)}
						</div>
					</div>
				</div>
				
				<div className="p-6 flex-1 flex flex-col">
					<h3 className="text-xl font-bold">{title}</h3>
					<p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">{description}</p>
					
					{/* Technology Stack */}
					<div className="flex items-center gap-2 mt-4 flex-wrap">
						{technologies.slice(0, 4).map((tech, index) => {
							const IconComponent = tech.icon;
							return (
								<Tooltip key={index} delayDuration={0}>
									<TooltipTrigger asChild>
										<div className="p-2 rounded-md bg-muted/50 hover:bg-muted transition-colors">
											<IconComponent className="w-4 h-4" />
										</div>
									</TooltipTrigger>
									<TooltipContent>
										<p>{tech.name}</p>
									</TooltipContent>
								</Tooltip>
							);
						})}
						{technologies.length > 4 && (
							<Badge variant="outline" className="text-xs">
								+{technologies.length - 4} more
							</Badge>
						)}
					</div>
					
					{/* Action Buttons */}
					<div className="mt-6 flex gap-2">
						<Button asChild className="flex-1" variant="outline">
							<Link href={`/projects/${generateSlug(title)}`}>
								View Details
								<ArrowRightIcon className="w-4 h-4 ml-1" />
							</Link>
						</Button>
						{liveLink && (
							<Button asChild size="sm" variant="outline">
								<Link href={liveLink} target="_blank" rel="noopener noreferrer">
									<ExternalLink className="w-4 h-4" />
								</Link>
							</Button>
						)}
					</div>
				</div>
			</div>
		</TooltipProvider>
	);
}

export default Project;
