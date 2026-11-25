<script lang="ts">
	import { resolve } from '$app/paths';
	import { buttonVariants } from 'sawitsvelte';
	import { GITHUB_URL } from '#lib/site.ts';
</script>

<section class="border-t border-border" aria-labelledby="cta-heading">
	<div class="mx-auto w-full max-w-6xl px-6 py-20">
		<div
			class="relative overflow-hidden rounded-xl border border-border bg-card px-6 py-14 text-center sm:px-12"
		>
			<div
				class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--landing-lime-strong)] to-transparent opacity-60"
				aria-hidden="true"
			></div>

			<h2 id="cta-heading" class="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
				Start building with sawitSvelte.
			</h2>
			<p class="mx-auto mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
				Read the documentation, browse the components, and take the code wherever you need it to go.
			</p>

			<div class="mt-8 flex flex-wrap items-center justify-center gap-3">
				<a
					href={resolve('/docs')}
					class={buttonVariants({
						size: 'lg',
						class:
							'bg-[var(--landing-lime)] text-[var(--landing-lime-ink)] hover:bg-[var(--landing-lime-strong)]'
					})}
				>
					Explore documentation
				</a>
				<a
					href={GITHUB_URL}
					target="_blank"
					rel="external noopener noreferrer"
					class={buttonVariants({ variant: 'outline', size: 'lg' })}
				>
					View on GitHub
					<span class="sr-only"> (opens in a new tab)</span>
				</a>
			</div>
		</div>
	</div>
</section>
