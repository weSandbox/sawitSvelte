import { cn, type ClassValue } from './cn.js';

export type Props = Record<string, unknown>;
type EventHandler = (event: Event) => void;

/**
 * Only DOM event handlers (`onclick`, `onkeydown`, …) are composed. Value
 * callbacks such as `onOpenChange` are *replaced*, because composing two
 * observers of the same value has no meaningful order.
 */
function isDomEventHandler(key: string): boolean {
	return /^on[a-z]/.test(key);
}

function composeEventHandlers(base: EventHandler, override: EventHandler): EventHandler {
	return (event) => {
		base(event);
		if (!event.defaultPrevented) override(event);
	};
}

function mergeStyle(base: unknown, override: unknown): unknown {
	if (typeof base === 'string' && typeof override === 'string') {
		const trimmed = base.trim().replace(/;\s*$/, '');
		return trimmed ? `${trimmed}; ${override}` : override;
	}
	return override;
}

/**
 * Merges the props a component controls with the props a consumer passed,
 * without either side silently winning by accident.
 *
 * Rules, in order of application:
 *
 * - `class` is joined and Tailwind conflicts are resolved, so the consumer wins
 *   on conflicting utilities and keeps everything else.
 * - `style` strings are concatenated; anything else is overridden.
 * - DOM event handlers compose. The component's handler runs first; the
 *   consumer's runs only if `event.preventDefault()` was not called, which is
 *   how "disabled" blocks activation without removing the handler.
 * - A consumer value of `undefined` does not clobber the component's value, so
 *   spreading optional props cannot erase behaviour.
 * - Everything else is overridden by the consumer.
 */
export function mergeProps(
	base: Props | null | undefined,
	override: Props | null | undefined
): Props {
	const result: Props = { ...base };
	if (!override) return result;

	for (const [key, value] of Object.entries(override)) {
		if (value === undefined) continue;

		const existing = result[key];

		if (key === 'class') {
			result[key] = cn(existing as ClassValue, value as ClassValue);
		} else if (key === 'style') {
			result[key] = mergeStyle(existing, value);
		} else if (
			isDomEventHandler(key) &&
			typeof existing === 'function' &&
			typeof value === 'function'
		) {
			result[key] = composeEventHandlers(existing as EventHandler, value as EventHandler);
		} else {
			result[key] = value;
		}
	}

	return result;
}
