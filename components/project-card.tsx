import { Codepen, WindIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";

interface ProjectProps {
	title: string;
	description: string;
	imageSrc: string;
	altText: string;
	projectLink: string;
}

function Project({
	title,
	description,
	imageSrc,
	altText,
	projectLink,
}: ProjectProps) {
	return (
		<div className="bg-background rounded-lg shadow-lg overflow-hidden group">
			<Link href={projectLink} className="block" prefetch={false}>
				<img
					src={imageSrc}
					alt={altText}
					width={600}
					height={400}
					className="w-full h-64 object-cover group-hover:opacity-80 transition-opacity"
					style={{ aspectRatio: "600/400", objectFit: "cover" }}
				/>
			</Link>
			<div className="p-6">
				<h3 className="text-xl font-bold">{title}</h3>
				<p className="text-muted-foreground mt-2">{description}</p>
				<div className="flex items-center gap-2 mt-4">
					<Codepen className="w-6 h-6" />
					<WindIcon className="w-6 h-6" />
					<Codepen className="w-6 h-6" />
				</div>
				<div className="mt-4">
					<Link
						href={projectLink}
						className="inline-flex items-center gap-2 font-medium text-primary hover:underline underline-offset-4"
						prefetch={false}>
						View Project
						<ArrowRightIcon className="w-4 h-4" />
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Project;
