import {
	SiNextdotjs,
	SiSupabase,
	SiTailwindcss,
	SiThemoviedatabase,
	SiTypescript,
} from "react-icons/si";
import { FaStrava } from "react-icons/fa";

export const projects = [
	{
		title: "Enduro Stats",
		description:
			"EnduroStats is a fitness app that helps users track activities, set goals, and monitor progress with a sleek, responsive design.",
		imageSrc: "/strava3.png", // Reference the image path directly from the public folder
		altText: "Enduro Stats project screenshot",
		projectLink: "#",
		
		technologies: [
			{ icon: SiNextdotjs, name: "Next.js" },
			{ icon: SiTypescript, name: "TypeScript" },
			{ icon: SiTailwindcss, name: "Tailwind CSS" },
			{ icon: FaStrava, name: "Strava API" },
		],challenges: [
			"The app was built with a focus on performance and scalability, which required careful consideration of data structures and API design.",
			"Implementing real-time updates and integrating external APIs like Strava presented significant technical challenges.",
			"Ensuring a responsive design that works well on both desktop and mobile devices was a challenging task.",
		],
		learnings: [
			"Gained a deeper understanding of React and Next.js, including server-side rendering and client-side navigation.",
			"Learned how to effectively use Tailwind CSS for styling and responsive design.",
			"Acquired skills in API development and integration, including authentication and data handling.",
		],
		implementation: "The app was built with a focus on performance and scalability, which required careful consideration of data structures and API design.",
		changes: [
			"The app was built with a focus on performance and scalability, which required careful consideration of data structures and API design.",
			"Implementing real-time updates and integrating external APIs like Strava presented significant technical challenges.",
			"Ensuring a responsive design that works well on both desktop and mobile devices was a challenging task.",
		],
		screenshots: [
			{ src: "/endurofull.png", alt: "Enduro Stats project screenshot" },
		],
	},
	{
		title: "Reel Ratings",
		description:
			"Reel Ratings is a movie rating app that allows users to rate and review movies.",
		imageSrc: "/reelratings.png",
		altText: "Project 2",
		projectLink: "#",
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
		imageSrc: "/strava3.png", // Reference the image path directly from the public folder
		altText: "Memory Mapper project screenshot",
		projectLink: "#",
		technologies: [
			{ icon: SiNextdotjs, name: "Next.js" },
			{ icon: SiTypescript, name: "TypeScript" },
			{ icon: SiTailwindcss, name: "Tailwind CSS" },
			{ icon: SiSupabase, name: "Supabase" },
		],
	},
	{
		title: "Karl's Dev Blog",
		description:
			"This my personal blog where I write about my experiences and thoughts on software development.",
		imageSrc: "/devblog2.png", // Reference the image path directly from the public folder
		altText: "Enduro Stats project screenshot",
		projectLink: "#",
		technologies: [
			{ icon: SiNextdotjs, name: "Next.js" },
			{ icon: SiTypescript, name: "TypeScript" },
			{ icon: SiTailwindcss, name: "Tailwind CSS" },
			{ icon: FaStrava, name: "Strava API" },
		],
	},
	{
		title: "Enduro Stats",
		description:
			"EnduroStats is a fitness app that helps users track activities, set goals, and monitor progress with a sleek, responsive design.",
		imageSrc: "/strava3.png", // Reference the image path directly from the public folder
		altText: "Enduro Stats project screenshot",
		projectLink: "#",
		technologies: [
			{ icon: SiNextdotjs, name: "Next.js" },
			{ icon: SiTypescript, name: "TypeScript" },
			{ icon: SiTailwindcss, name: "Tailwind CSS" },
			{ icon: FaStrava, name: "Strava API" },
		],
	},
	{
		title: "Enduro Stats",
		description:
			"EnduroStats is a fitness app that helps users track activities, set goals, and monitor progress with a sleek, responsive design.",
		imageSrc: "/strava3.png", // Reference the image path directly from the public folder
		altText: "Enduro Stats project screenshot",
		projectLink: "#",
		technologies: [
			{ icon: SiNextdotjs, name: "Next.js" },
			{ icon: SiTypescript, name: "TypeScript" },
			{ icon: SiTailwindcss, name: "Tailwind CSS" },
			{ icon: FaStrava, name: "Strava API" },
		],
	},
];
