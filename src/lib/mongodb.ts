import { MongoClient } from "mongodb";

let clientPromise: Promise<MongoClient> | undefined;

export default function getClientPromise(): Promise<MongoClient> {
	const uri = process.env.MONGODB_URI;
	if (!uri) {
		throw new Error("MONGODB_URI is not set in environment variables");
	}
	if (!clientPromise) {
		if (process.env.NODE_ENV === "development") {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const globalAny = global as any;
			if (!globalAny._mongoClientPromise) {
				const client = new MongoClient(uri);
				globalAny._mongoClientPromise = client.connect();
			}
			clientPromise = globalAny._mongoClientPromise as Promise<MongoClient>;
		} else {
			const client = new MongoClient(uri);
			clientPromise = client.connect();
		}
	}
	return clientPromise;
} 