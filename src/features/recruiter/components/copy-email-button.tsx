"use client";

import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { useUiStrings } from "@/shared/i18n/use-ui-strings";

interface CopyEmailButtonProps {
	email: string;
}

export function CopyEmailButton({ email }: CopyEmailButtonProps) {
	const [copied, setCopied] = useState(false);
	const ui = useUiStrings();

	async function handleCopy() {
		try {
			await navigator.clipboard.writeText(email);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			setCopied(false);
		}
	}

	return (
		<div className="inline-flex items-center gap-2">
			<Button type="button" variant="outline" onClick={handleCopy}>
				{ui.copyEmail}
			</Button>
			<span role="status" aria-live="polite" className="text-sm">
				{copied ? ui.emailCopied : ""}
			</span>
		</div>
	);
}
