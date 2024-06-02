import NextAuth from "next-auth/next";

import StravaProvider from "next-auth/providers/strava";

const handler = NextAuth({
	providers: [
		StravaProvider({
			clientId: process.env.STRAVA_CLIENT_ID as string,
			clientSecret: process.env.STRAVA_CLIENT_SECRET as string,
			authorization: {
				params: {
					scope: "read,activity:read",
				},
			},
		}),
	],
	pages: {
		signIn: "/auth/signin",
		signOut: "/auth/signout",
		error: "/auth/error",
	},
	callbacks: {
		async jwt(params) {
			const { token, user, account, profile, isNewUser } = params;
			if (account?.accessToken) {
				token.accessToken = account.accessToken;
			}
			return Promise.resolve(token);
		},
		async session(params) {
			const { session, user } = params;
			session.accessToken = (user as { accessToken?: string })?.accessToken ?? "";
			return Promise.resolve(session);
		},
	},
});

export { handler as GET, handler as POST };

