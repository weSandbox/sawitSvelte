import { createRawSnippet, mount, unmount } from 'svelte';
import { afterAll, afterEach, beforeEach, describe, it } from 'vitest';
import Button from '../../src/lib/button/button.svelte';
import ButtonLink from '../fixtures/button-link.svelte';
import { expectNoA11yViolations } from '../support/a11y.js';

type Mounted = ReturnType<typeof mount>;

const instances: Mounted[] = [];
let container: HTMLElement;

const label = (text: string) =>
	createRawSnippet(() => ({
		render: () => `<span>${text}</span>`
	}));

function render(props: Record<string, unknown>): void {
	instances.push(mount(Button, { target: container, props: props as never }));
}

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
	describe(`Button accessibility — ${theme}`, () => {
		beforeEach(() => {
			document.documentElement.dataset.theme = theme;
		});

		it('every enabled variant and size is free of serious violations', async () => {
			for (const variant of ['default', 'secondary', 'outline', 'ghost', 'destructive']) {
				render({ variant, children: label(`${variant} action`) });
			}

			for (const size of ['sm', 'default', 'lg']) {
				render({ size, children: label(`${size} action`) });
			}

			render({ size: 'icon', 'aria-label': 'Add item', children: label('+') });

			await expectNoA11yViolations(container);
		});

		it('an enabled polymorphic link is free of serious violations', async () => {
			instances.push(
				mount(ButtonLink, {
					target: container,
					props: { onclick: (event: Event) => event.preventDefault() }
				})
			);

			await expectNoA11yViolations(container);
		});

		/*
		 * Unavailable states are drawn at 50% opacity. axe already exempts inactive
		 * components from contrast (WCAG 1.4.3), so these run with the full rule set
		 * and nothing is suppressed on our side.
		 */
		it('unavailable states are free of serious violations', async () => {
			render({ disabled: true, children: label('Disabled action') });
			render({ loading: true, children: label('Loading action') });
			instances.push(mount(ButtonLink, { target: container, props: { disabled: true } }));

			await expectNoA11yViolations(container);
		});
	});
}
