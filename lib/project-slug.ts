export function projectSlugFromTitle(title: string): string {
	return title.toLowerCase().replace(/\s+/g, "-");
}
