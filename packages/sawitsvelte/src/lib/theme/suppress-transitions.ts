/**
 * Injects a stylesheet that kills transitions for one frame. Without this, every
 * component with a `transition-colors` flashes through the old palette when the
 * theme flips.
 */
export function suppressTransitions(): () => void {
	if (typeof document === 'undefined') return () => {};

	const style = document.createElement('style');
	style.textContent = '*,*::before,*::after{transition:none!important}';
	document.head.appendChild(style);

	// Force a style recalculation while transitions are disabled.
	void window.getComputedStyle(document.body).opacity;

	return () => {
		requestAnimationFrame(() => style.remove());
	};
}
