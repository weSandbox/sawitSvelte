import { twMerge } from 'tailwind-merge';

export type ClassValue =
	| string
	| number
	| bigint
	| boolean
	| null
	| undefined
	| ClassValue[]
	| Record<string, boolean | null | undefined>;

function collect(value: ClassValue, out: string[]): void {
	if (!value) return;

	if (typeof value === 'string' || typeof value === 'number' || typeof value === 'bigint') {
		out.push(String(value));
		return;
	}

	if (Array.isArray(value)) {
		for (const item of value) collect(item, out);
		return;
	}

	if (typeof value === 'object') {
		for (const [key, enabled] of Object.entries(value)) {
			if (enabled) out.push(key);
		}
	}
}

/**
 * Joins class values, then resolves Tailwind conflicts so the last class wins.
 *
 * The merge step is what makes `class` passthrough predictable: a consumer
 * writing `<Button class="bg-red-500" />` gets red, regardless of the order the
 * two rules happen to land in the generated stylesheet.
 */
export function cn(...inputs: ClassValue[]): string {
	const out: string[] = [];
	for (const input of inputs) collect(input, out);
	return twMerge(out.join(' '));
}
