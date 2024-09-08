import { SiNextdotjs, SiTailwindcss, SiTypescript } from "react-icons/si";
import { FaStrava } from "react-icons/fa";

export const projects = [
	{
		title: "Enduro Stats",
		description:
			"EnduroStats is a fitness tracking app that helps users monitor their activities, set personalized goals, and track their progress over time with a sleek and responsive user experience.",
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
		title: "Project 2",
		description: "A detailed description of the second project.",
		imageSrc: "/placeholder.svg",
		altText: "Project 2",
		projectLink: "#",
		technologies: [
			{ icon: SiNextdotjs, name: "Next.js" },
			{ icon: SiTailwindcss, name: "Tailwind CSS" },
		],
	},
];
