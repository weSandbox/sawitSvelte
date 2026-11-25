import { describe, expect, it } from 'vitest';
import { cn } from './cn.js';

describe('cn', () => {
	it('joins class values', () => {
		expect(cn('a', 'b')).toBe('a b');
	});

	it('skips falsy values', () => {
		expect(cn('a', false, null, undefined, '', 0, 'b')).toBe('a b');
	});

	it('flattens nested arrays', () => {
		expect(cn(['a', ['b', ['c']]])).toBe('a b c');
	});

	it('includes object keys with truthy values', () => {
		expect(cn({ a: true, b: false, c: true })).toBe('a c');
	});

	it('lets later Tailwind classes win over earlier ones', () => {
		expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
		expect(cn('bg-primary', 'bg-red-500')).toBe('bg-red-500');
	});

	it('keeps non-conflicting classes', () => {
		expect(cn('rounded-md', 'text-sm', 'p-2')).toBe('rounded-md text-sm p-2');
	});
});
