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

export function ApexForm() {
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
		console.log(values);
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
