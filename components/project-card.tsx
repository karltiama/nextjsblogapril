import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
	Tooltip,
	TooltipProvider,
	TooltipTrigger,
	TooltipContent,
} from "@/components/ui/tooltip"; // Make sure this path is correct
import { SiNextdotjs, SiTailwindcss } from "react-icons/si";

function generateSlug(title: string) {
	return title.toLowerCase().replace(/\s+/g, '-');
}

interface ProjectProps {
	title: string;
	description: string;
	imageSrc: string;
	altText: string;
	projectLink: string;
	technologies: Array<{ icon: React.ElementType; name: string }>;
}

function Project({
	title,
	description,
	imageSrc,
	altText,
	technologies,
}: ProjectProps) {
	return (
		<TooltipProvider>
			<Link href={`/projects/${generateSlug(title)}`} className="block group">
				<div className="bg-background rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 h-full flex flex-col">
					<div className="relative w-full h-64">
						<Image
							src={imageSrc}
							alt={altText}
							fill
							className="object-cover group-hover:opacity-80 transition-opacity"
						/>
					</div>
					<div className="p-6 flex-1 flex flex-col">
						<h3 className="text-xl font-bold">{title}</h3>
						<p className="text-muted-foreground mt-2 flex-1">{description}</p>
						<div className="flex items-center gap-2 mt-4">
							{/* Dynamically render technology icons with tooltips */}
							{technologies.map((tech, index) => {
								const IconComponent = tech.icon;
								return (
									<Tooltip key={index} delayDuration={0}>
										<TooltipTrigger asChild>
											<span className="flex items-center">
												<IconComponent className="w-6 h-6" />
											</span>
										</TooltipTrigger>
										<TooltipContent>
											<p>{tech.name}</p>
										</TooltipContent>
									</Tooltip>
								);
							})}
						</div>
						<div className="mt-4">
							<span className="inline-flex items-center gap-2 font-medium text-primary">
								View Project
								<ArrowRightIcon className="w-4 h-4" />
							</span>
							{/* Line Animation */}
							<span className="block relative mt-1">
								<span className="block w-0 h-1 bg-primary transition-all duration-300 group-hover:w-full" />
							</span>
						</div>
					</div>
				</div>
			</Link>
		</TooltipProvider>
	);
}

export default Project;
