/** Splits a `class` attribute into tokens so assertions compare classes, not substrings. */
export function classTokens(element: Element): string[] {
	return element.className.split(/\s+/).filter(Boolean);
}
