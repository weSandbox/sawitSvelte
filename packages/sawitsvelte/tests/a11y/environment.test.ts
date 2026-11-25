import { afterEach, describe, expect, it } from 'vitest';
import { scan } from '../support/a11y.js';

/**
 * Guard for the accessibility scans themselves.
 *
 * axe's colour-contrast rule inspects computed colours. If the test page failed
 * to load the design system, every scan would run against unstyled markup and
 * pass for the wrong reason. This asserts the token bridge actually produced
 * utilities with resolved values.
 */
describe('test environment', () => {
	afterEach(() => {
		document.body.innerHTML = '';
	});

	it('loads design tokens and Tailwind utilities', () => {
		const element = document.createElement('div');
		element.className = 'bg-primary text-primary-foreground rounded-lg';
		element.textContent = 'probe';
		document.body.appendChild(element);

		const style = getComputedStyle(element);

		expect(style.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
		expect(style.backgroundColor).not.toBe(style.color);
		// `rounded-lg` resolves from --sawit-radius-lg, so a 10px default radius is
		// proof the bridge mapped the theme rather than Tailwind's defaults.
		expect(style.borderTopLeftRadius).toBe('10px');
	});

	it('applies the theme through data-theme', () => {
		const element = document.createElement('div');
		element.className = 'bg-background';
		document.body.appendChild(element);

		document.documentElement.dataset.theme = 'light';
		const light = getComputedStyle(element).backgroundColor;

		document.documentElement.dataset.theme = 'dark';
		const dark = getComputedStyle(element).backgroundColor;

		document.documentElement.removeAttribute('data-theme');

		expect(light).not.toBe(dark);
	});

	/*
	 * The scans above only mean something if a broken tree actually fails. These
	 * deliberately break one thing at a time and assert axe notices, so a future
	 * axe upgrade or config mistake cannot turn the suite silently green.
	 */
	it('detects a control with no accessible name', async () => {
		const button = document.createElement('button');
		button.className = 'size-9 bg-primary';
		document.body.appendChild(button);

		const ids = (await scan(button)).map((violation) => violation.id);

		expect(ids).toContain('button-name');
	});

	it('detects insufficient colour contrast', async () => {
		const paragraph = document.createElement('p');
		paragraph.textContent = 'Barely visible text';
		paragraph.style.color = '#dddddd';
		paragraph.style.backgroundColor = '#ffffff';
		document.body.appendChild(paragraph);

		const ids = (await scan(paragraph)).map((violation) => violation.id);

		expect(ids).toContain('color-contrast');
	});
});
