import ProjectList from "@/components/project-list"; // Adjust the path as needed

export default async function ProjectsPage() {
	return (
		<div className="container max-w-4xl py-6 lg:py-10">
			<div className="flex flex-col items-start md:flex-row md:justify-between md:gap-8">
				<div className="flex-1 space-y-4">
					<h1 className="inline-block font-black text-4xl lg:text-5xl">
						Projects
					</h1>
					<p className="text-xl text-muted-foreground">
						My personal projects and experiments.
					</p>
				</div>
			</div>

			{/* Pass the projects array to the ProjectList component */}
			<div className="mt-8">
				<ProjectList />
			</div>
		</div>
	);
}
