import {
	SiNextdotjs,
	SiSupabase,
	SiTailwindcss,
	SiThemoviedatabase,
	SiTypescript,
	SiMapbox,
	SiResend,
	SiMdx,
} from "react-icons/si";
import { FaStrava } from "react-icons/fa";

export const projects = [
	{
		title: "Enduro Stats",
		description:
			"EnduroStats is a fitness app that helps users track activities, set goals, and monitor progress with a sleek, responsive design.",
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
		situation: "As an avid runner, I wanted to create a personal dashboard to track my running statistics and visualize my progress as I trained for the Toronto Waterfront Marathon in 2024. The goal was to learn how to interact with an external API and enhance my skills in frontend and backend development.",
		challenges: [
			"Understanding and implementing OAuth authentication to securely access the Strava API.",
			"Handling and visualizing complex datasets effectively to provide meaningful insights.",
			"Ensuring the application is responsive and user-friendly, providing a seamless experience for users.",
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
			"The website was built to be a personal dashboard for me to track my running statistics and visualize my progress, but as I got more comfortable with interacting with the Strava API, I decided to make it a public website to help other runners. In the future I plan to add more features to the website to help runners in their training journey. Also I would like to add the ability to add friends and compare runs and rides. Much of the features I would like to add are more dependent on an actual database and backend, which I am working on learning.",
		],
		screenshots: [
			{ src: "/endurofull.png", alt: "Enduro Stats project screenshot" },
			{ src: "/strava.png", alt: "Enduro Stats project screenshot" },
			{ src: "/recentactivities.png", alt: "Enduro Stats project screenshot" },
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
			{ icon: SiResend, name: "Resend" },
		],
		liveLink: "https://memorymapper.vercel.app",
		githubRepo: "https://github.com/karltiama/memorymap",
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
	},
];
