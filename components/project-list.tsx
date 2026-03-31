import Project from "./project-card";
import { projects } from "../content/projects/projectsData";

export default function ProjectList() {
	const featuredProjects = projects.filter(p => p.featured);

	return (
		<section className="w-full py-12">
			<div className="container px-4 md:px-6">
				<div className="grid grid-cols-1 gap-8">
					{featuredProjects.map((project, index) => (
						<Project
							key={index}
							title={project.title}
							description={project.description}
							imageSrc={project.imageSrc}
							altText={project.altText}
							technologies={project.technologies}
							liveLink={project.liveLink}
							githubRepo={project.githubRepo}
							status={project.status}
							featured={project.featured}
							reverseLayout={index % 2 === 1}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
