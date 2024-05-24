"use client";

import { signIn, useSession } from "next-auth/react";
import React from "react";

const Dashboard = () => {
	const { data: session } = useSession();

	return (
		<>
			{session ? (
				<>
					<h1>{JSON.stringify(session)}</h1>
				</>
			) : (
				<div className="">
					<h1 className="text-3xl text-red-500 font-bold">
						You are not logged in!
					</h1>
					<button
						onClick={() => signIn("strava")}
						className="border border-black rounded-lg">
						{" "}
						Sign in with strava
					</button>
				</div>
			)}
		</>
	);
};

export default Dashboard;
