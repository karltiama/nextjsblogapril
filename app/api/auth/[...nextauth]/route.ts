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
	callbacks: {
		async jwt(token: JWT, user, account) {
			// Add the accessToken to the JWT if it's available
			if (account?.accessToken) {
				token.accessToken = account.accessToken;
			}
			return token;
		},
		async session(session: Session, userOrToken: JWT | any) {
			// Assign the accessToken from the JWT to the session
			if ("accessToken" in userOrToken) {
				session.accessToken = userOrToken.accessToken;
			}
			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET, // Make sure this is set in your .env.local file
});

export { handler as GET, handler as POST };
