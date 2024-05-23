"use client";

import { signIn, useSession } from "next-auth/react";
import React from "react";

const Dashboard = () => {
	const { data: session } = useSession();

	return (
		<>
			{session ? (
				<>
					<h1>Welcome</h1>
				</>
			) : (
				<>
					<h1 className="text-3xl text-red-500 font-bold">
						You are not logged in!
					</h1>
					<button
						onClick={() => signIn("google")}
						className="border border-black rounded-lg">
						{" "}
						Sign in with google
					</button>
					<button
						onClick={() => signIn("github")}
						className="border border-black rounded-lg">
						{" "}
						Sign in with github
					</button>
				</>
			)}
		</>
	);
};

export default Dashboard;
