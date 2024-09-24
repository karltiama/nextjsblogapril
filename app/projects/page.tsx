import ProjectList from "@/components/project-list"; // Adjust the path as needed

export default async function ProjectsPage() {
	return (
		<div className="container max-w-4xl py-6 lg:py-10">
			<div className="flex flex-col items-start gap-4">
				<h1 className="font-black text-3xl md:text-4xl lg:text-5xl">
					Projects
				</h1>
				<p className="text-xl text-muted-foreground">
					My personal projects and experiments.
				</p>
			</div>

			{/* Pass the projects array to the ProjectList component */}
			<ProjectList />
		</div>
	);
}
