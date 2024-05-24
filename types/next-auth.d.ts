// types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
	/**
	 * Extends the built-in session types to include accessToken.
	 */
	interface Session {
		accessToken?: string;
	}

	/**
	 * Extends the built-in JWT types to include accessToken.
	 */
	interface JWT {
		accessToken?: string;
	}
}
