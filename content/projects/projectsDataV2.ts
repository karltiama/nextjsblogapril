import { Project } from "../../lib/types";
import { projects as legacyProjects } from "./projectsData";

export const projectsV2: Project[] = legacyProjects.map((project) => ({
	...project,
	sections: {
		overview: project.situation,
		challenges:
			project.title === "NBA Analytics App"
				? [
						"Inconsistent data formats across different websites.",
						"Mismatched schemas and missing fields.",
						"Unreliable or delayed updates.",
						"Increasing time spent cleaning data instead of building features.",
					]
				: project.challenges,
		implementation:
			project.title === "NBA Analytics App"
				? "To address these issues, I redesigned the system around a more robust, API-driven architecture.\n\nData Source and Ingestion: Transitioned from web scraping to a paid API to ensure structured, reliable data. Built automated ingestion pipelines using AWS Lambda triggered by EventBridge schedules. Managed infrastructure and scheduling through Terraform using CLI-based workflows.\n\nData Architecture: Implemented a dual-layer data model where the Raw Layer stores unmodified API responses for auditing and reprocessing, while the Analytics Layer transforms data into clean, query-optimized tables. This separation allowed safe transformations while preserving data integrity and traceability.\n\nModeling and Analysis: Developed baseline projection models using historical player performance, then calculated expected value (EV) by comparing model outputs against market odds. Structured the system to support future enhancements such as more advanced models and feature engineering."
				: project.implementation,
		keyDecisions:
			project.title === "NBA Analytics App"
				? [
						"API over scraping: prioritized reliability and consistency over cost savings.",
						"Raw to analytics pipeline: enabled safer transformations and easier debugging.",
						"Server-side ingestion with Lambda: decoupled data processing from the frontend for scalability.",
						"Automated scheduling with EventBridge: ensured continuous, hands-off data updates.",
					]
				: project.task,
		tradeoffs:
			project.title === "NBA Analytics App"
				? [
						"Using a paid API increased operational cost but significantly improved data quality.",
						"Serverless ingestion with Lambda simplified scaling but introduced complexity in debugging and observability.",
						"Separating data layers improved safety and flexibility at the cost of added architectural complexity.",
					]
				: project.changes,
		learnings:
			project.title === "NBA Analytics App"
				? [
						"Data quality is foundational: unreliable inputs make all downstream analysis questionable.",
						"Schema design should come first: investing early in data modeling prevents costly refactors.",
						"Separation of concerns is critical: isolating raw and processed data improves both safety and flexibility.",
						"Confidence in your pipeline matters more than model complexity.",
						"Gained hands-on experience with real-world tooling, including AWS Lambda, EventBridge, and Terraform, in a production-style workflow.",
					]
				: project.learnings,
	},
}));
