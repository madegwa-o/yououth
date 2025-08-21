import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET() {
	const session = await auth();
	if (!session) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}
	return NextResponse.json({ ok: true, user: session.user });
} 