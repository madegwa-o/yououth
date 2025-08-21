import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

// Minimal config using Credentials for demo and Google if env is set
export const authConfig = {
	providers: [
		Credentials({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const email = credentials?.email as string | undefined;
				const password = credentials?.password as string | undefined;
				// Demo-only: accept any non-empty email/password and return a basic user
				if (email && password) {
					return { id: email, email } as { id: string; email: string };
				}
				return null;
			},
		}),
		// Include Google if client id/secret exist
		...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
			? [
				Google({
					clientId: process.env.GOOGLE_CLIENT_ID,
					clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				}),
			]
			: []),
	],
	// Use JWT session strategy by default in v5
	session: { strategy: "jwt" },
} satisfies NextAuthConfig;

export default authConfig; 