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
} from "react-icons/si";
import { FaStrava } from "react-icons/fa";

export const projects = [
	{
		title: "Enduro Stats V2",
		description:
			"A complete ground-up refactor of my fitness tracking app with improved architecture, advanced analytics, and professional development practices. Built with modern React patterns, proper data persistence, and enhanced user experience.",
		imageSrc: "/endurostatsv2.png",
		altText: "Enduro Stats V2 project screenshot",
		technologies: [
			{ icon: SiNextdotjs, name: "Next.js" },
			{ icon: SiTypescript, name: "TypeScript" },
			{ icon: SiTailwindcss, name: "Tailwind CSS" },
			{ icon: FaStrava, name: "Strava API" },
			{ icon: SiSupabase, name: "Supabase" },
			{ icon: SiReactquery, name: "React Query" },
			{ icon: SiResend, name: "Resend" },
			{ icon: SiUmami, name: "Umami" },
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
		implementation: "I completely rebuilt the application from the ground up using modern React patterns and best practices. The new architecture includes proper data modeling with Supabase, intelligent caching strategies, and a robust data synchronization system. I implemented React Query for efficient data fetching, proper error boundaries, and comprehensive testing. The app now features advanced analytics, trend visualization, and a much more maintainable codebase.",
		learnings: [
			"Deep understanding of React Query and modern data fetching patterns",
			"Experience with database design and data synchronization strategies",
			"Advanced TypeScript patterns and type safety best practices",
			"Professional development workflow with testing, CI/CD, and code quality tools",
			"Performance optimization and caching strategies for real-time data applications"
		],
		changes: [
			"Complete architectural overhaul with proper separation of concerns",
			"Advanced analytics and trend analysis capabilities",
			"Professional testing suite and CI/CD pipeline",
			"Improved performance through intelligent caching and data management",
			"Better user experience with enhanced UI/UX and responsive design"
		],
		screenshots: [
			{ src: "/activity-analytics.png", alt: "Activity Analytics" },
			{ src: "/performance-trends.png", alt: "Performance Trends" },
			{ src: "/activegoals.png", alt: "Active Goals" },
			{ src: "/trainingload.png", alt: "Training Load" },
		],
		relatedBlogPosts: [
			{
				title: "Enduro Stats Refactor (Part 1)",
				slug: "enduro-refactor",
				description: "The complete refactor of my fitness tracking app with improved architecture"
			}
		],
	},
	{
		title: "Memory Mapper",
		description:
			"Memory Mapper is a tool that helps users map out their memories and experiences.",
		imageSrc: "/memorymapperss.png", // Reference the image path directly from the public folder
		altText: "Memory Mapper project screenshot",
		technologies: [
			{ icon: SiNextdotjs, name: "Next.js" },
			{ icon: SiTypescript, name: "TypeScript" },
			{ icon: SiTailwindcss, name: "Tailwind CSS" },
			{ icon: SiSupabase, name: "Supabase" },
			{ icon: SiMapbox, name: "Mapbox" },
			{ icon: SiResend, name: "Resend" }
		],
		liveLink: "https://memorymapper.vercel.app",
		githubRepo: "https://github.com/karltiama/memorymap",
		status: "Live" as const,
		featured: false,
		situation:"During my recent trip to Canada, I struggled to find an app that effectively combined mapping, photo integration, and journaling to document my journey. This inspired me to create my own travel mapping app – a digital companion that plots routes and serves as an interactive journal. The app I envision would feature custom map markers, seamless photo integration, and detailed location notes, allowing travelers to capture the essence of their experiences. By developing it myself, I can tailor it to specific needs and include sharing capabilities for friends and family. This project not only allows me to expand my skills in web development and mapping technologies but could also evolve into a versatile tool for other travelers. Ultimately, it aims to transform how we remember and share travel experiences, turning each journey into a vivid, digital story.",
		challenges: [
			"Integrating Mapbox for interactive maps and custom markers.",
			"Creating a seamless photo integration system.",
			"Designing an intuitive interface for location notes and journal entries.",
			"Developing a system for secure user authentication and data storage.",
			"Implementing a media management system to allow users to add, edit, and delete memories and photos.",
			"Allowing users to edit their trips and memories after they submit them."
		],
		task:[
			"Develop a user-friendly interface for adding and managing trips, locations, and photos.",
			"Implement media management to allow users to add, edit, and delete memories and photos.",
			"Create a sharing features that allow users to easily share their trips and memories with friends and family."
		],
		implementation:"My first step was to research on my options for mapping, I was looking for a solution that was React friendly and cost effective. I found many options such as Google Maps, Mapbox and Leaflet. After evaluating the pros and cons of each option, I decided to use Mapbox as it has a generous free tier and is well documented.",
		learnings:[
			"Learned how to use Mapbox and how to implement custom markers and interactivity into the map.",
			"Gained experience in using Supabase for authentication and data storage, and Resend for sending emails.",
			"Enhanced my skills in media management and how to store and retrieve media from a database.",
			"Learned how to implement a rich text editor that allows users to add and edit memories and photos."
		],
		changes:[
			"I would take a different approach in the system design of the website, I would create a more modular and scalable architecture. I would also spend more time on the frontend design of the website to make it more aesthetically pleasing."
		],
		screenshots:[],
	},
	{
		title: "Karl's Dev Blog",
		description:
			"This my personal blog where I write about my experiences and thoughts on software development.",
		imageSrc: "/devblog2.png", // Reference the image path directly from the public folder
		altText: "Enduro Stats project screenshot",
		liveLink: "https://karltiama.dev",
		githubRepo: "https://github.com/karltiama/nextjsblogapril",
		technologies: [
			{ icon: SiNextdotjs, name: "Next.js" },
			{ icon: SiTypescript, name: "TypeScript" },
			{ icon: SiTailwindcss, name: "Tailwind CSS" },
			{ icon: SiMdx, name: "MDX" },
		],
		status: "Live" as const,
		featured: false,
		situation:"I wanted to create a portfolio websites that showcases my projects and skills as a software developer. I also wanted to share my thoughts and ideas on software development. I've learned the best way to learn is to teach and talk about what topics that peak my interest, this blog is my way of sharing my knowledge and experiences with the world.",
		challenges:[
			"Finding the right balance between showcasing my projects and sharing my thoughts on software development.",
			"Creating a system that allows me to share and manage my blog post and projects in a way that is easy to use and maintain.",
			"Make the website look and feel professional and aesthetically pleasing."
		],
		task:[],
		implementation:"I will start of by saying that creating this website was a journey, There are many ways to go about creating a blog website, from using a CMS to using a static site generator. I decided to use Next.js with Velite to create the site. I was searching for a good library to fetch my blog post from MDX and JSON/YAML files to present it in a type-safe format. I found contentlayer, however I found it to be unmaintained. Thus leading me to find Velite. It allowed me to validate my content using Zod and generate typesafe queries to fetch my blog post. It also has built-in files and images processing. ",
		learnings:[
			"I learned how to use Next.js with Velite to create a static site generator that allows me to fetch my blog post from MDX and JSON/YAML files to present it in a type-safe format.",
		],
		changes:[
			"In the future I may add a backend to the website to further enhnace the user experience, and add features to leave comments on my blog posts."
		],
		screenshots:[],
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
