<script lang="ts">
	import { resolve } from '$app/paths';
	import { GITHUB_URL, NPM_PACKAGE, NPM_PUBLISHED } from '#lib/site.ts';
</script>

<section class="border-t border-border" aria-labelledby="dx-heading">
	<div class="mx-auto w-full max-w-6xl px-6 py-20">
		<div class="max-w-2xl">
			<p class="text-xs font-medium tracking-widest text-muted-foreground uppercase">
				Developer experience
			</p>
			<h2 id="dx-heading" class="mt-3 text-3xl font-semibold tracking-tight text-balance">
				Two ways to adopt sawitSvelte.
			</h2>
			<p class="mt-3 text-base leading-relaxed text-muted-foreground">
				Use it as a package with per-component subpath imports, or copy the source and make it
				yours. Both are supported, and both are described here as they exist today.
			</p>
		</div>

		<div class="mt-10 grid gap-6 lg:grid-cols-2">
			<div class="rounded-lg border border-border bg-card p-6">
				<div class="flex items-center justify-between gap-2">
					<h3 class="text-base font-semibold tracking-tight">Install the package</h3>
					{#if NPM_PUBLISHED}
						<span
							class="rounded-full border border-border px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase"
						>
							available
						</span>
					{:else}
						<span
							class="rounded-full border border-border px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase"
						>
							pre-release
						</span>
					{/if}
				</div>
				<p class="mt-3 text-sm leading-relaxed text-muted-foreground">
					{#if NPM_PUBLISHED}
						One package, per-component subpaths.
					{:else}
						<code class="font-mono text-xs">sawitsvelte</code> is not on the public npm registry yet.
						Until it is published, install it from source. The subpath exports and the three-line CSS
						contract below are already implemented.
					{/if}
				</p>
				<ul class="mt-4 space-y-2 text-sm text-muted-foreground">
					<li class="flex gap-2">
						<span class="text-[var(--landing-accent)]" aria-hidden="true">—</span>
						<span>
							Import from the barrel:
							<code class="font-mono text-xs">
								import &#123; Button &#125; from '{NPM_PACKAGE}'
							</code>
						</span>
					</li>
					<li class="flex gap-2">
						<span class="text-[var(--landing-accent)]" aria-hidden="true">—</span>
						<span>
							Or per component: <code class="font-mono text-xs">
								import * as Card from '{NPM_PACKAGE}/card'
							</code>
						</span>
					</li>
					<li class="flex gap-2">
						<span class="text-[var(--landing-accent)]" aria-hidden="true">—</span>
						<a
							href={GITHUB_URL}
							target="_blank"
							rel="external noopener noreferrer"
							class="font-medium underline-offset-4 hover:underline"
						>
							Get the source on GitHub<span class="sr-only"> (opens in a new tab)</span>
						</a>
					</li>
				</ul>
			</div>

			<div class="rounded-lg border border-border bg-card p-6">
				<div class="flex items-center justify-between gap-2">
					<h3 class="text-base font-semibold tracking-tight">Copy and customize</h3>
					<span
						class="rounded-full border border-border px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase"
					>
						implemented
					</span>
				</div>
				<p class="mt-3 text-sm leading-relaxed text-muted-foreground">
					Every component page publishes its source with copy-source, so you can paste a component
					into your project and edit it freely.
				</p>
				<ul class="mt-4 space-y-2 text-sm text-muted-foreground">
					<li class="flex gap-2">
						<span class="text-[var(--landing-accent)]" aria-hidden="true">—</span>
						<span>
							Open a component's <a
								href={resolve('/components/button')}
								class="font-medium underline-offset-4 hover:underline"
							>
								source
							</a> and copy it into your app.
						</span>
					</li>
					<li class="flex gap-2">
						<span class="text-[var(--landing-accent)]" aria-hidden="true">—</span>
						<span>
							Copied parts keep working through the documented utilities — <code
								class="font-mono text-xs"
							>
								cn
							</code>, <code class="font-mono text-xs">mergeProps</code>, and
							<code class="font-mono text-xs">tailwind-variants</code>. Copy-paste means owning the
							markup, not dropping dependencies.
						</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>
