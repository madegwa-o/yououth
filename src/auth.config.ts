import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Nodemailer from "next-auth/providers/nodemailer";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import getClientPromise from "@/lib/mongodb";

export const authConfig = {
	adapter: MongoDBAdapter(getClientPromise()),
	providers: [
		Nodemailer({
			server: process.env.EMAIL_SERVER,
			from: process.env.EMAIL_FROM,
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
	session: { strategy: "jwt" },
	callbacks: {
		async signIn({ user, account, email }) {
			// Ensure the user exists in DB by email (adapter should handle creation for email/OAuth)
			// This callback can be used to restrict sign-in if needed.
			return true;
		},
	},
} satisfies NextAuthConfig;

export default authConfig; 