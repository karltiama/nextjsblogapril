import { projectsV2 as projects } from "@/content/projects/projectsDataV2";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";
import Link from "next/link";
import {
	Tooltip,
	TooltipProvider,
	TooltipTrigger,
	TooltipContent,
} from "@/components/ui/tooltip"; // Make sure this path is correct

function generateSlug(title: string) {
	return title.toLowerCase().replace(/\s+/g, "-");
}

export async function generateStaticParams() {
	return projects.map((project) => ({
		projectName: generateSlug(project.title),
	}));
}

export default async function ProjectPage({
	params,
}: {
	params: Promise<{ projectName: string }>;
}) {
	const resolvedParams = await params;
	const project = projects.find(
		(p) => generateSlug(p.title) === resolvedParams.projectName
	);

	if (!project) {
		notFound();
	}

	const overview = project.sections?.overview ?? project.situation;
	const challenges = project.sections?.challenges ?? project.challenges;
	const implementation =
		project.sections?.implementation ?? project.implementation;
	const keyDecisions = project.sections?.keyDecisions ?? project.task;
	const tradeoffs = project.sections?.tradeoffs ?? project.changes;
	const learnings = project.sections?.learnings ?? project.learnings;
	const implementationParagraphs = implementation
		? implementation
				.split("\n\n")
				.map((paragraph) => paragraph.trim())
				.filter(Boolean)
		: [];

	return (
		<div className="container max-w-4xl py-6 lg:py-10">
			<h1 className="font-black text-3xl md:text-4xl lg:text-5xl mb-4">
				{project.title}
			</h1>
			<Image
				src={project.imageSrc}
				alt={project.altText}
				width={800}
				height={400}
				className="w-full mb-6"
			/>
			<p className="text-xl text-muted-foreground mb-8">
				{project.description}
			</p>

			<div className="flex flex-col md:flex-row gap-8 mb-8">
				<div className="flex-1">
					<h2 className="text-2xl font-semibold mb-2">Technologies Used:</h2>
					<div className="flex items-center gap-4">
						<TooltipProvider>
							{project.technologies.map((tech, index) => {
								const IconComponent = tech.icon;
								return (
									<Tooltip key={index} delayDuration={0}>
										<TooltipTrigger asChild>
											<span className="flex items-center">
												<IconComponent className="w-8 h-8" />
											</span>
										</TooltipTrigger>
										<TooltipContent>
											<p>{tech.name}</p>
										</TooltipContent>
									</Tooltip>
								);
							})}
						</TooltipProvider>
					</div>
				</div>
				<div className="flex-1">
					<h2 className="text-2xl font-semibold mb-2">Project Links:</h2>
					<div className="space-y-2">
						{project.liveLink ? (
							<a
								href={project.liveLink}
								target="_blank"
								rel="noopener noreferrer"
								className="text-primary hover:underline flex items-center gap-2"
							>
								<FaExternalLinkAlt className="w-4 h-4" />
								<span>View Live Project</span>
							</a>
						) : (
							<p className="text-muted-foreground">Live link not available</p>
						)}
						{project.githubRepo ? (
							<a
								href={project.githubRepo}
								target="_blank"
								rel="noopener noreferrer"
								className="text-primary hover:underline flex items-center gap-2"
							>
								<FaGithub className="w-4 h-4" />
								<span>GitHub Repository</span>
							</a>
						) : (
							<p className="text-muted-foreground">
								GitHub repository not available
							</p>
						)}
					</div>
				</div>
			</div>
			{overview && (
				<>
					<h2 className="text-2xl font-semibold mb-2">Overview:</h2>
					<p className="text-lg mb-4">{overview}</p>
				</>
			)}
			{challenges && challenges.length > 0 && (
				<>
					<h2 className="text-2xl font-semibold mb-2">Challenges:</h2>
					<ul className="list-disc list-inside mb-4">
						{challenges.map((challenge, index) => (
							<li key={index}>{challenge}</li>
						))}
					</ul>
				</>
			)}
			{implementation && (
				<>
					<h2 className="text-2xl font-semibold mb-2">Implementation:</h2>
					<div className="text-lg mb-4 space-y-4">
						{implementationParagraphs.length > 0 ? (
							implementationParagraphs.map((paragraph, index) => (
								<p key={index}>{paragraph}</p>
							))
						) : (
							<p>{implementation}</p>
						)}
					</div>
				</>
			)}

			{keyDecisions && keyDecisions.length > 0 && (
				<>
					<h2 className="text-2xl font-semibold mb-2">Key Decisions:</h2>
					<ul className="list-disc list-inside mb-4">
						{keyDecisions.map((decision, index) => (
							<li key={index}>{decision}</li>
						))}
					</ul>
				</>
			)}

			{tradeoffs && tradeoffs.length > 0 && (
				<>
					<h2 className="text-2xl font-semibold mb-2">Tradeoffs:</h2>
					<ul className="list-disc list-inside mb-4">
						{tradeoffs.map((tradeoff, index) => (
							<li key={index} className="text-lg">
								{tradeoff}
							</li>
						))}
					</ul>
				</>
			)}

			{learnings && learnings.length > 0 && (
				<>
					<h2 className="text-2xl font-semibold mb-2">Learnings:</h2>
					<ul className="list-disc list-inside mb-4">
						{learnings.map((learning, index) => (
							<li key={index} className="text-lg">
								{learning}
							</li>
						))}
					</ul>
				</>
			)}

			{project.relatedBlogPosts && project.relatedBlogPosts.length > 0 && (
				<>
					<h2 className="text-2xl font-semibold mb-4">Related Blog Posts:</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
						{project.relatedBlogPosts.map((post, index) => (
							<Link
								key={index}
								href={`/blog/${post.slug}`}
								className="group block p-4 border rounded-lg hover:border-primary transition-colors"
							>
								<div className="flex items-start gap-3">
									<FiBookOpen className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
									<div>
										<h3 className="font-semibold group-hover:text-primary transition-colors">
											{post.title}
										</h3>
										<p className="text-sm text-muted-foreground mt-1">
											{post.description}
										</p>
									</div>
								</div>
							</Link>
						))}
					</div>
				</>
			)}

			{project.screenshots && project.screenshots.length > 0 && (
				<>
					<h2 className="text-2xl font-semibold mb-4">Screenshots:</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
						{project.screenshots.map((screenshot, index) => (
							<Dialog key={index}>
								<DialogTrigger asChild>
									<div className="relative w-full aspect-[16/9] cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
										<Image
											src={screenshot.src}
											alt={screenshot.alt}
											fill
											className="object-cover"
										/>
										<div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
											<Button variant="ghost" className="text-white">
												View Full Screenshot
											</Button>
										</div>
									</div>
								</DialogTrigger>
								<DialogContent className="lg:max-w-screen-lg overflow-y-auto max-h-screen p-0">
									<div className="w-full bg-background p-4">
										<Image
											src={screenshot.src}
											alt={screenshot.alt}
											width={1920}
											height={1080}
											className="w-full h-auto"
										/>
									</div>
								</DialogContent>
							</Dialog>
						))}
					</div>
				</>
			)}
		</div>
	);
}
