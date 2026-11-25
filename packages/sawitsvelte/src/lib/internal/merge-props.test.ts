import { describe, expect, it, vi } from 'vitest';
import { mergeProps } from './merge-props.js';

describe('mergeProps', () => {
	it('returns base props when there is no override', () => {
		expect(mergeProps({ a: 1 }, undefined)).toEqual({ a: 1 });
		expect(mergeProps(undefined, undefined)).toEqual({});
	});

	it('lets the consumer override plain values', () => {
		expect(mergeProps({ title: 'base' }, { title: 'consumer' })).toEqual({ title: 'consumer' });
	});

	it('does not let an undefined override erase a base value', () => {
		expect(mergeProps({ disabled: true }, { disabled: undefined })).toEqual({ disabled: true });
	});

	it('allows a false override to beat a true base value', () => {
		expect(mergeProps({ disabled: true }, { disabled: false })).toEqual({ disabled: false });
	});

	it('joins classes and lets the consumer win Tailwind conflicts', () => {
		expect(mergeProps({ class: 'px-4 bg-primary' }, { class: 'px-2' })).toEqual({
			class: 'bg-primary px-2'
		});
	});

	it('keeps the base class when the override has none', () => {
		expect(mergeProps({ class: 'px-4' }, { class: undefined })).toEqual({ class: 'px-4' });
	});

	it('concatenates style strings', () => {
		expect(mergeProps({ style: 'color: red' }, { style: 'margin: 0' })).toEqual({
			style: 'color: red; margin: 0'
		});
	});

	it('composes DOM event handlers in order', () => {
		const calls: string[] = [];
		const merged = mergeProps(
			{ onclick: () => calls.push('base') },
			{ onclick: () => calls.push('consumer') }
		);

		(merged.onclick as (event: Event) => void)(new Event('click'));

		expect(calls).toEqual(['base', 'consumer']);
	});

	it('skips the consumer handler when the base handler prevents the default', () => {
		const consumer = vi.fn();
		const merged = mergeProps(
			{
				onclick: (event: Event) => event.preventDefault()
			},
			{ onclick: consumer }
		);

		// `cancelable: true` is required — preventDefault is a no-op otherwise.
		(merged.onclick as (event: Event) => void)(new Event('click', { cancelable: true }));

		expect(consumer).not.toHaveBeenCalled();
	});

	it('replaces value callbacks instead of composing them', () => {
		const base = vi.fn();
		const consumer = vi.fn();
		const merged = mergeProps({ onOpenChange: base }, { onOpenChange: consumer });

		(merged.onOpenChange as (value: boolean) => void)(true);

		expect(base).not.toHaveBeenCalled();
		expect(consumer).toHaveBeenCalledWith(true);
	});

	it('passes data and aria attributes through untouched', () => {
		const merged = mergeProps(
			{ 'data-slot': 'button', 'aria-busy': 'true' },
			{ 'data-slot': 'custom', 'aria-busy': undefined }
		);

		expect(merged).toEqual({ 'data-slot': 'custom', 'aria-busy': 'true' });
	});
});
