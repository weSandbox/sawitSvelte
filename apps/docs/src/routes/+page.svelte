<script lang="ts">
	import Seo from '#lib/components/seo.svelte';
	import ComponentShowcase from '#lib/components/landing/component-showcase.svelte';
	import DeveloperExperience from '#lib/components/landing/developer-experience.svelte';
	import Features from '#lib/components/landing/features.svelte';
	import FinalCta from '#lib/components/landing/final-cta.svelte';
	import GettingStarted from '#lib/components/landing/getting-started.svelte';
	import Hero from '#lib/components/landing/hero.svelte';
</script>

<Seo
	title="Accessible Svelte 5 UI components"
	description="sawitSvelte is an open-source UI framework built for Svelte 5: accessible components, a cohesive design system, runtime theming, and complete control over your code."
/>

<!--
	The lime accent is scoped to the landing page. These custom properties are set
	once on the wrapper and inherited by every section and by the components they
	render, so no framework token or component style is changed.

	Lime is split into two roles so it stays legible in both themes:
	- surface (--landing-lime / -strong) is always paired with dark ink text.
	- text (--landing-accent) darkens for light backgrounds and brightens for
	  dark ones, matching how the token layer tunes accents per theme.
-->
<div class="landing">
	<Hero />
	<Features />
	<ComponentShowcase />
	<DeveloperExperience />
	<GettingStarted />
	<FinalCta />
</div>

<style>
	.landing {
		--landing-lime: oklch(0.87 0.21 128);
		--landing-lime-strong: oklch(0.8 0.22 128);
		--landing-lime-ink: oklch(0.24 0.06 128);
		--landing-accent: oklch(0.5 0.18 128);
	}

	:global([data-theme='dark']) .landing {
		--landing-accent: oklch(0.87 0.21 128);
	}
</style>
