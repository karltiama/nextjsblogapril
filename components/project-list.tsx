import Project from "./project-card";
import { projects } from "../content/projects/projectsData";

export default function ProjectList() {
	return (
		<section className="w-full py-12">
			<div className="container px-4 md:px-6">
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{projects.map((project, index) => (
						<Project
							key={index}
							title={project.title}
							description={project.description}
							imageSrc={project.imageSrc}
							altText={project.altText}
							projectLink={project.projectLink}
							technologies={project.technologies}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
