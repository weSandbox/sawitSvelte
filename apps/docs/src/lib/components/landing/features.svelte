<script lang="ts">
	const features = [
		{
			title: 'Accessible by design',
			body: 'Platform semantics first. Real buttons, real headings, ARIA only where the platform leaves a gap. Every state is scanned with axe in light and dark.'
		},
		{
			title: 'Composable components',
			body: 'Multipart components like Card expose parts — Root, Header, Title, Content, Footer — that you combine freely. Nothing renders that you did not ask for.'
		},
		{
			title: 'Custom behavior layer',
			body: 'Our own primitives, not a wrapper around another library. Shared helpers such as mergeProps and the data-* attribute contract ship today; overlay primitives land in Phase 3.'
		},
		{
			title: 'Tailwind CSS v4',
			body: 'CSS-first, with tokens transported as CSS variables through @theme inline. Utilities emit var(--token), so a theme can change at runtime without regenerating CSS.'
		},
		{
			title: 'Developer control',
			body: 'Every visual decision is a token. Every structural decision accepts class and a child snippet. Classes merge through cn(), so your utilities win on conflict.'
		},
		{
			title: 'Svelte 5 native',
			body: 'Runes for state, context for composition, snippets for polymorphism. No framework-agnostic abstraction layer — just Svelte, typed with TypeScript strict.'
		}
	] as const;
</script>

<section class="border-t border-border" aria-labelledby="features-heading">
	<div class="mx-auto w-full max-w-6xl px-6 py-20">
		<div class="max-w-2xl">
			<p class="text-xs font-medium tracking-widest text-muted-foreground uppercase">
				Why sawitSvelte
			</p>
			<h2 id="features-heading" class="mt-3 text-3xl font-semibold tracking-tight text-balance">
				A framework you can read, restyle, and own.
			</h2>
		</div>

		<dl class="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
			{#each features as feature, index (feature.title)}
				<div class="border-t border-border pt-5">
					<dt class="flex items-baseline gap-3 text-base font-semibold tracking-tight">
						<span class="font-mono text-xs text-[var(--landing-accent)]">
							{String(index + 1).padStart(2, '0')}
						</span>
						{feature.title}
					</dt>
					<dd class="mt-2 pl-7 text-sm leading-relaxed text-muted-foreground">{feature.body}</dd>
				</div>
			{/each}
		</dl>
	</div>
</section>
