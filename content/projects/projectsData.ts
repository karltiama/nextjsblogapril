import {
	SiNextdotjs,
	SiSupabase,
	SiTailwindcss,
	SiThemoviedatabase,
	SiTypescript,
	SiMapbox,
	SiResend,
	SiMdx,
	SiReactquery,
	SiUmami,
	SiPython,
	SiTensorflow,
	SiPandas,
	SiScikitlearn,
	SiTerraform,
	SiAmazonwebservices,
} from "react-icons/si";
import { FaStrava } from "react-icons/fa";
import { Project } from "../../lib/types";

export const projects: Project[] = [
	{
		title: "NBA Analytics App",
		description:
			"A data-driven NBA analytics platform built on a custom backend pipeline that ingests real-time sports data, transforms it into structured datasets, and applies projection models to evaluate player prop opportunities.",
		imageSrc: "/nbalandingpage.png",
		altText: "NBA Analytics App landing page screenshot",
		technologies: [
			{ icon: SiNextdotjs, name: "Next.js" },
			{ icon: SiTypescript, name: "TypeScript" },
			{ icon: SiSupabase, name: "Supabase" },
			{ icon: SiAmazonwebservices, name: "AWS Lambda" },
			{ icon: SiTerraform, name: "Terraform" },
		],
		status: "In Development" as const,
		featured: true,
		situation: "The sports betting space is heavily driven by data, but most tools either rely on surface-level stats or require manual analysis. I set out to build a system that could ingest real-time National Basketball Association data and turn it into actionable insights for evaluating player prop bets.",
		challenges: [
			"Early on, I underestimated the complexity of sourcing reliable data.",
			"Attempted to scrape multiple websites for stats and odds",
			"Ran into inconsistent data formats and mismatched schemas",
			"Faced accuracy concerns due to unreliable or partial data",
			"Spent significant time cleaning data instead of building features"
		],
		task: [
			"Design a reliable, scalable system that uses consistent and trustworthy data sources",
			"Separate raw data from processed analytics to ensure data integrity",
			"Automate ingestion via AWS Lambda + EventBridge to remove manual work",
			"Enable accurate modeling for projections and Expected Value (EV) calculations"
		],
		implementation: "I shifted from scraping to a structured, API-driven architecture. Data Source Upgrade: Transitioned from web scraping to a paid API for consistent, structured data. Data Architecture: Designed a raw → analytics (staged) pipeline. Raw layer stores untouched API data for auditing; Analytics layer transforms data into query-ready structures. Automation: Built scheduled ingestion pipelines using AWS Lambda + EventBridge managed via Terraform CLI. Modeling: Developed baseline projection models using historical performance and calculated EV vs market odds.",
		learnings: [
			"Data quality > everything: Scraping introduced too much inconsistency — reliable APIs made everything downstream easier.",
			"Schema design should come first: Planning the data model upfront saves significant time.",
			"Separate raw and processed data: This allowed safe transformations without risking data integrity.",
			"Trust your data pipeline before your models: Doubts in data accuracy directly impact confidence in outputs.",
			"Real-world tooling matters: Gained hands-on experience with AWS Lambda, EventBridge, and Terraform through CLI-based workflows."
		],
		relatedBlogPosts: [
			{
				title: "My NBA Analytics Journey",
				slug: "nba-analytics",
				description: "How I built a data pipeline to predict game outcomes and evaluate player props."
			}
		],
	},
	{
		title: "Enduro Stats V2",
		description:
			"A full-stack fitness analytics platform built to replicate and extend premium Strava insights without requiring a subscription. Originally started as a simple API wrapper, the project was later refactored from the ground up to improve data modeling, scalability, and performance.",
		imageSrc: "/endurostatsv2.png",
		altText: "Enduro Stats V2 project screenshot",
		technologies: [
			{ icon: SiNextdotjs, name: "Next.js" },
			{ icon: SiTypescript, name: "TypeScript" },
			{ icon: SiTailwindcss, name: "Tailwind CSS" },
			{ icon: FaStrava, name: "Strava API" },
			{ icon: SiSupabase, name: "Supabase" },
			{ icon: SiReactquery, name: "React Query" },
		],
		liveLink: "https://endurostats.vercel.app/",
		githubRepo: "https://github.com/karltiama/endurorevamp",
		status: "Live" as const,
		featured: true,
		situation: "After completing the initial version of Enduro Stats, I realized the limitations of my original architecture. The app needed to evolve from a simple API wrapper into a robust analytics platform with proper data persistence, advanced caching, and professional development practices. This V2 represents a complete architectural overhaul.",
		challenges: [
			"Complete architectural refactoring from scratch while maintaining user data and functionality",
			"Implementing proper data persistence and synchronization with conflict resolution",
			"Building advanced analytics and trend analysis features",
			"Creating a scalable, maintainable codebase with proper testing and CI/CD",
			"Optimizing performance with intelligent caching and data management"
		],
		task: [
			"Redesign the entire application architecture with proper separation of concerns",
			"Implement persistent data storage and synchronization with Strava API",
			"Add advanced analytics, trend analysis, and performance insights",
			"Establish professional development practices including testing and CI/CD",
			"Create a more intuitive and feature-rich user experience"
		],
		implementation: "I completely rebuilt the application from the ground up using modern React patterns and best practices. The new architecture includes proper data modeling with Supabase, intelligent caching strategies, and a robust data synchronization system. I implemented React Query for efficient data fetching, proper error boundaries, and comprehensive testing.",
		learnings: [
			"Deep understanding of React Query and modern data fetching patterns",
			"Experience with database design and data synchronization strategies",
			"Advanced TypeScript patterns and type safety best practices",
			"Professional development workflow with testing, CI/CD, and code quality tools",
			"Performance optimization and caching strategies for real-time data applications"
		],
		screenshots: [
			{ src: "/activity-analytics.png", alt: "Activity Analytics" },
			{ src: "/performance-trends.png", alt: "Performance Trends" },
			{ src: "/activegoals.png", alt: "Active Goals" },
			{ src: "/trainingload.png", alt: "Training Load" },
		],
	},
	{
		title: "Tiama Legacy",
		description:
			"A complete ground-up rebuild of a lodging website with integrated booking system. Featuring modern architecture, real-time availability, and secure payment processing.",
		imageSrc: "/construction.png",
		altText: "Tiama Legacy lodging website preview",
		technologies: [
			{ icon: SiNextdotjs, name: "Next.js" },
			{ icon: SiTypescript, name: "TypeScript" },
			{ icon: SiTailwindcss, name: "Tailwind CSS" },
			{ icon: SiSupabase, name: "Supabase" },
			{ icon: SiReactquery, name: "React Query" },
		],
		status: "In Development" as const,
		featured: true,
		situation: "Tiama Legacy is a complete overhaul of an existing lodging website, rebuilt from the ground up with modern architecture and a robust booking system. The project aims to create a seamless user experience for guests while providing powerful management tools for property owners.",
		challenges: [
			"Designing a scalable database schema for properties, bookings, and user management",
			"Implementing real-time availability checking and booking conflict resolution",
			"Building secure payment processing and booking confirmation workflows",
			"Creating an intuitive admin dashboard for property management"
		],
		task: [
			"Design and implement comprehensive database schema using Supabase",
			"Build responsive frontend with modern UI/UX for property browsing",
			"Develop secure booking system with real-time availability checking",
			"Create admin dashboard for property and booking management"
		],
		implementation: "Starting with a complete architectural redesign, I'm building the application using Next.js 14 with App Router. The backend leverages Supabase for database management and authentication. React Query handles efficient data fetching and caching for booking availability. The project emphasizes type safety with TypeScript throughout.",
		learnings: [
			"Advanced database design for complex booking and property management systems",
			"Real-time data synchronization and conflict resolution strategies",
			"Payment processing integration and secure transaction handling",
			"Role-based access control and multi-tenant architecture patterns"
		],
	},
	{
		title: "My Personal Dev Blog",
		description:
			"This my personal blog where I write about my experiences and thoughts on software development.",
		imageSrc: "/devblog2.png",
		altText: "Dev Blog project screenshot",
		technologies: [
			{ icon: SiNextdotjs, name: "Next.js" },
			{ icon: SiTypescript, name: "TypeScript" },
			{ icon: SiTailwindcss, name: "Tailwind CSS" },
			{ icon: SiMdx, name: "MDX" },
		],
		status: "Live" as const,
		featured: false,
		situation: "I wanted to create a portfolio website that showcases my projects and skills. I also wanted to share my thoughts on software development. I've learned the best way to learn is to teach, and this blog is my way of sharing knowledge.",
		challenges: [
			"Finding the right balance between showcasing projects and sharing thoughts.",
			"Creating a system to easily manage blog posts and projects.",
			"Making the website look and feel professional and aesthetically pleasing."
		],
		task: [],
		implementation: "I used Next.js with Velite to create the site. It allowed me to validate my content using Zod and generate typesafe queries for blog posts. It also handles built-in files and image processing.",
		learnings: [
			"Learned how to use Next.js with Velite as a type-safe static site generator."
		],
	},
	{
		title: "Memory Mapper",
		description:
			"Hands-on experience with Supabase and Mapbox. Allows travelers to capture the essence of their experiences through an interactive map journal.",
		imageSrc: "/memorymapperss.png",
		altText: "Memory Mapper project screenshot",
		technologies: [
			{ icon: SiNextdotjs, name: "Next.js" },
			{ icon: SiTypescript, name: "TypeScript" },
			{ icon: SiTailwindcss, name: "Tailwind CSS" },
			{ icon: SiSupabase, name: "Supabase" },
			{ icon: SiMapbox, name: "Mapbox" },
		],
		status: "Archived" as const,
		featured: false,
		situation: "I struggled to find an app that combined mapping, photo integration, and journaling. This inspired me to create my own travel mapping app - a digital companion that plots routes and serves as an interactive journal.",
		challenges: [
			"Integrating Mapbox for interactive maps and custom markers.",
			"Creating a seamless photo integration system.",
			"Designing an intuitive interface for location notes.",
			"Secure user authentication and data storage."
		],
		task: [
			"Develop a user-friendly interface for adding trips and locations.",
			"Implement media management for memories and photos.",
		],
		implementation: "I chose Mapbox for its React-friendly integration and generous free tier. Supabase handles the authentication and data storage, while Resend handles email notifications.",
		learnings: [
			"Custom markers and interactivity in Mapbox.",
			"Supabase for authentication and data management.",
			"Implementing a rich text editor for journal entries."
		],
	},
	{
		title: "Reel Ratings",
		description:
			"Reel Ratings is a movie rating app that allows users to rate and review movies.",
		imageSrc: "/reelratings.png",
		altText: "Project 2",
		technologies: [
			{ icon: SiNextdotjs, name: "Next.js" },
			{ icon: SiTailwindcss, name: "Tailwind CSS" },
			{ icon: SiTypescript, name: "TypeScript" },
			{ icon: SiSupabase, name: "Supabase" },
			{ icon: SiThemoviedatabase, name: "TMDB API" },
		],
		githubRepo: "https://github.com/karltiama/movieapp",
		status: "Completed" as const,
		featured: false,
		situation:"I created this project to further improve my skills with API integration and backend development. I wanted to create a movie rating app that pulled data from an External API and allow uses to rate and review movies.",
		challenges:[
			"Creating user authentication and authorization",
			"Handling backend data and storing it in a backend database",
			"Designing the schema for the database and how to store the likes and reviews",
		],
		task:[],
		implementation:"",
		learnings:[],
		changes:[],
		screenshots:[],
	},
	{
		title: "Enduro Stats",
		description:
			"EnduroStats is a fitness app that helps users track activities, set goals, and monitor progress with a sleek, responsive design. Currently undergoing a complete ground-up refactor with improved architecture.",
		imageSrc: "/strava3.png", // Reference the image path directly from the public folder
		altText: "Enduro Stats project screenshot",
		technologies: [
			{ icon: SiNextdotjs, name: "Next.js" },
			{ icon: SiTypescript, name: "TypeScript" },
			{ icon: SiTailwindcss, name: "Tailwind CSS" },
			{ icon: FaStrava, name: "Strava API" },
		],
		liveLink: "https://endurostats.vercel.app",
		githubRepo: "https://github.com/karltiama/junestravaapp",
		status: "Completed" as const,
		featured: false,
		situation: "A personalized fitness dashboard built to track my running progress and visualize activity data from Strava as I trained for the 2024 Toronto Waterfront Marathon. This project started as a personal tool for myself and evolved into a public-facing web app designed to help other runners easily track performance trends and gain insight into their training.",
		challenges: [
			"Implemented secure OAuth 2.0 authentication flow with Strava using Next.js API routes for user connection and activity fetching.",
			"Developed backend API logic for token handling, caching, and pagination to optimize API requests and stay within rate limits.",
			"Built an interactive, data-driven dashboard that visualizes complex datasets — making performance trends easy to understand at a glance.",
			"Designed a fully responsive UI focused on clarity and usability across devices."
		],
		task: [
			"Integrate with the Strava API to fetch and display workout data, in my case running and cycling.",
			"Display the data in a dashboard that is both aesthetically pleasing and functional.",
			"Ensure the application is secure and handles data appropriately.",
		],
		implementation: "To integrate with the Strava API, I implemented OAuth authentication to securely obtain and store access tokens. I created API routes using Next.js to handle the OAuth callback, exchange the authorization code for an access token, and store the token securely in cookies. Additionally, I set up API routes to fetch user activity data from the Strava API using the stored access token. To ensure efficient data handling, I implemented caching and pagination mechanisms. This approach allowed me to securely and efficiently fetch and display running statistics in the application, providing valuable insights and visualizations for users.",
		learnings: [
			"Gained a deeper understanding of React and Next.js, including server-side rendering and client-side navigation.",
			"Enhanced my skills in frontend development, focusing on responsive design and user experience.",
			"Acquired skills in API development and integration, including authentication and data handling.",
			"Learned best practices fro data visualization and handling large datasets."
		],
		changes: [
			"Implementing API caching with revalidation and stale-while-revalidate to reduce Strava API requests",
			"Planning to add friend tracking and activity comparison features",
			"Need to implement a persistent backend using Supabase/PostgreSQL for social features",
			"Looking to expand backend development experience through user data management and authentication"
		],
		screenshots: [
			{ src: "/endurofull.png", alt: "Enduro Stats project screenshot" },
			{ src: "/strava.png", alt: "Enduro Stats project screenshot" },
			{ src: "/recentactivities.png", alt: "Enduro Stats project screenshot" },
		],
		relatedBlogPosts: [
			{
				title: "Strava API Integration",
				slug: "strava-api",
				description: "Learn how I integrated the Strava API into my fitness tracking app"
			}
		],
	},
	
];
