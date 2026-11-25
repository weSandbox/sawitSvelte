import { mount, unmount } from 'svelte';
import { afterAll, afterEach, beforeEach, describe, it } from 'vitest';
import { expectNoA11yViolations } from '../support/a11y.js';
import CardDemo from '../fixtures/card-demo.svelte';

type Mounted = ReturnType<typeof mount>;

const instances: Mounted[] = [];
let container: HTMLElement;

beforeEach(() => {
	container = document.createElement('div');
	document.body.appendChild(container);
});

afterEach(() => {
	for (const instance of instances.splice(0)) unmount(instance);
	document.body.innerHTML = '';
});

afterAll(() => {
	document.documentElement.removeAttribute('data-theme');
});

const themes = ['light', 'dark'] as const;

for (const theme of themes) {
	describe(`Card accessibility — ${theme}`, () => {
		beforeEach(() => {
			document.documentElement.dataset.theme = theme;
		});

		it('a complete card is free of serious violations', async () => {
			instances.push(mount(CardDemo, { target: container }));

			await expectNoA11yViolations(container);
		});

		it('keeps the document outline legal for a non-default heading level', async () => {
			instances.push(mount(CardDemo, { target: container, props: { level: 2 } }));

			await expectNoA11yViolations(container);
		});
	});
}
