import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
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
	projectLink,
	technologies,
}: ProjectProps) {
	return (
		<TooltipProvider>
			{" "}
			{/* Wrap the whole card or at least the icons in TooltipProvider */}
			<div className="group bg-background rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
				<Link href={`/projects/${generateSlug(title)}`} className="block">
					<img
						src={imageSrc}
						alt={altText}
						width={600}
						height={400}
						className="w-full h-64 object-contain group-hover:opacity-80 transition-opacity"
						style={{ aspectRatio: "600/400" }}
					/>
				</Link>
				<div className="p-6">
					<h3 className="text-xl font-bold">{title}</h3>
					<p className="text-muted-foreground mt-2">{description}</p>
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
						<Link
							href={projectLink}
							className="inline-flex items-center gap-2 font-medium text-primary"
							prefetch={false}>
							View Project
							<ArrowRightIcon className="w-4 h-4" />
						</Link>
						{/* Line Animation */}
						<span className="block relative mt-1">
							<span className="block w-0 h-1 bg-primary transition-all duration-300 group-hover:w-full" />
						</span>
					</div>
				</div>
			</div>
		</TooltipProvider>
	);
}

export default Project;
