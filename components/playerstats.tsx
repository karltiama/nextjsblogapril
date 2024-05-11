"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

// "./ui/sheet"

// Defining types for the player data state
interface RankData {
	rankName: string;
}

export function ApexForm() {
	const [platform, setPlatform] = useState<string>("PC");
	const [playerName, setPlayerName] = useState<string>("");
	const [playerData, setPlayerData] = useState<PlayerData | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	const fetchPlayerStats = async () => {
		setLoading(true);
		setError("");
		try {
			const response = await fetch(
				`/api/player-stats?platform=${platform}&playerName=${encodeURIComponent(
					playerName
				)}`
			);
			if (!response.ok) throw new Error("Failed to fetch player data");
			const data: PlayerData = await response.json();
			console.log("API Data Recieved", data);
			if (data.legends && data.legends.select && data.legends.selected.data) {
				console.log("Selected Legends Data Array:", data.legends.selected.data);
			}
			setPlayerData(data);
		} catch (err) {
			// Check if the error is an instance of Error and has a message
			if (err instanceof Error) {
				setError(err.message);
			} else {
				// If not, you can set a default error message
				setError("An unexpected error occurred");
			}
		} finally {
			setLoading(false);
		}
	};

	const formSchema = z.object({
		username: z.string().min(2).max(20),
		platform: z.string({
			required_error: "Please select a Platform",
		}),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			platform: "PC",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		if (!playerName) {
			setError("Please enter a player name");
			return;
		}
		fetchPlayerStats();
	}

	return (
		<div className="flex flex-col	justify-center items-center">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input placeholder="KrazyKarlHD" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="platform"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Platform</FormLabel>
								<Select>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Your platform" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="PC">PC</SelectItem>
										<SelectItem value="XBOX">XBOX</SelectItem>
										<SelectItem value="PS">PS</SelectItem>
									</SelectContent>
								</Select>
							</FormItem>
						)}
					/>
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</div>
	);
}
