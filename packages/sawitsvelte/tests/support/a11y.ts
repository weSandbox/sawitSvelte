import axe from 'axe-core';
import { expect } from 'vitest';

/**
 * Rules switched off for component-level scans, each with its justification.
 *
 * `region` is a page-structure rule: it requires all content to sit inside a
 * landmark. Component tests mount a fragment into an otherwise empty document,
 * so the rule cannot pass regardless of how the component is built, and it says
 * nothing about the component itself. Page-level scans (the docs site) keep it.
 *
 * That is the only rule disabled anywhere. Notably `color-contrast` stays on:
 * axe already exempts inactive components (WCAG 1.4.3), so disabled and loading
 * states are scanned with the full rule set rather than being suppressed by us.
 */
const DISABLED_RULES: NonNullable<axe.RunOptions['rules']> = {
	region: { enabled: false }
};

/** WCAG A/AA failures we refuse to ship. Minor and moderate are reported, not fatal. */
const BLOCKING_IMPACTS: ReadonlyArray<axe.ImpactValue> = ['serious', 'critical'];

function format(results: axe.Result[]): string {
	if (results.length === 0) return '';
	return results
		.map((result) => {
			const targets = result.nodes.map((node) => node.target.join(' ')).join(', ');
			return `[${result.impact}] ${result.id}: ${result.help}\n    at ${targets}`;
		})
		.join('\n');
}

/**
 * Runs axe against a subtree and returns every violation it found.
 *
 * The theme is whatever `data-theme` is currently set to on `<html>`, which is
 * how the same markup gets scanned in light and dark.
 */
export async function scan(target: Element = document.body): Promise<axe.Result[]> {
	const results = await axe.run(target, {
		resultTypes: ['violations'],
		rules: DISABLED_RULES
	});

	return results.violations;
}

/**
 * Fails the test on any serious or critical violation, and prints anything
 * below that threshold so it stays visible without blocking the build.
 */
export async function expectNoA11yViolations(target: Element = document.body): Promise<void> {
	const violations = await scan(target);
	const blocking = violations.filter(
		(violation) => violation.impact && BLOCKING_IMPACTS.includes(violation.impact)
	);
	const advisory = violations.filter(
		(violation) => !violation.impact || !BLOCKING_IMPACTS.includes(violation.impact)
	);

	if (advisory.length > 0) {
		console.info(`a11y advisory (below serious):\n${format(advisory)}`);
	}

	expect(format(blocking)).toBe('');
}
