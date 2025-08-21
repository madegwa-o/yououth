"use client";

import { useState } from "react";

export default function ProtectedCall() {
	const [result, setResult] = useState<string>("");
	const [loading, setLoading] = useState(false);

	async function callProtected() {
		setLoading(true);
		setResult("");
		try {
			const res = await fetch("/api/protected");
			const text = await res.text();
			setResult(`${res.status}: ${text}`);
		} catch (e: unknown) {
			const message = e instanceof Error ? e.message : "unknown";
			setResult(`error: ${message}`);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="flex flex-col gap-2">
			<button
				onClick={callProtected}
				className="rounded border px-3 py-2 text-sm"
				disabled={loading}
			>
				{loading ? "Calling..." : "Call /api/protected"}
			</button>
			<pre className="text-xs whitespace-pre-wrap break-words">{result}</pre>
		</div>
	);
} 