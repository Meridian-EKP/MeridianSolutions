"use client";

import BackgroundGlows from "@/components/BackgroundGlows";

export default function ClientShell({ children }: { children: React.ReactNode }) {
	return (
		<>
			<BackgroundGlows />
			{children}
		</>
	);
}


