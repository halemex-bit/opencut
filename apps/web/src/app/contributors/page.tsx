import type { Metadata } from "next";
import { BasePage } from "../base-page";

export const metadata: Metadata = {
	title: "Contributors - OpenCut",
	description:
		"Meet the amazing people who contribute to OpenCut, the free and open-source video editor.",
};

// Editor-only Cloudflare deploy: keep this page static-safe without Radix/Avatar
// (npm CI was failing page data collection with createContext is not a function).
export default function ContributorsPage() {
	return (
		<BasePage
			title="Contributors"
			description="OpenCut is open source. Contributor listing is disabled in this editor-only deploy."
		>
			<p className="text-center text-muted-foreground text-sm">
				See the upstream project on GitHub for the full contributor list.
			</p>
		</BasePage>
	);
}
