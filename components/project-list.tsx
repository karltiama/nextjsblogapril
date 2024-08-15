import Project from "./project-card";

export default function ProjectList() {
	const projects = [
		{
			title: "Fitness Tracker",
			description:
				"Fitness tracker to keep track of your daily activities that interacts with the Strava API.",
			imageSrc: "/placeholder.svg",
			altText: "Project 1",
			projectLink: "#",
		},
		{
			title: "Project 2",
			description: "A detailed description of the second project.",
			imageSrc: "/placeholder.svg",
			altText: "Project 2",
			projectLink: "#",
		},
		{
			title: "Project 3",
			description: "A detailed description of the third project.",
			imageSrc: "/placeholder.svg",
			altText: "Project 3",
			projectLink: "#",
		},
		{
			title: "Project 4",
			description: "A detailed description of the third project.",
			imageSrc: "/placeholder.svg",
			altText: "Project 4",
			projectLink: "#",
		},
		// Add more projects as needed
	];

	return (
		<section className="w-full py-12 md:py-24 lg:py-32">
			<div className="container px-4 md:px-6">
				<div className="grid gap-8 mt-12 md:grid-cols-2">
					{projects.map((project, index) => (
						<Project
							key={index}
							title={project.title}
							description={project.description}
							imageSrc={project.imageSrc}
							altText={project.altText}
							projectLink={project.projectLink}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
