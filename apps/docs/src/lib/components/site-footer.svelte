<script lang="ts">
	import { resolve } from '$app/paths';
	import { GITHUB_URL, implementedComponents, NPM_PACKAGE, SITE_NAME } from '#lib/site.ts';

	const year = new Date().getFullYear();
</script>

<footer class="border-t border-border">
	<div class="mx-auto w-full max-w-6xl px-6 py-12">
		<div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
			<div>
				<p class="text-sm font-semibold tracking-tight">{SITE_NAME}</p>
				<p class="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
					An open-source UI framework built for Svelte 5. Accessible components, a cohesive design
					system, and complete control over your code.
				</p>
			</div>

			<nav aria-label="Documentation">
				<h2 class="text-xs font-medium tracking-widest text-muted-foreground uppercase">
					Documentation
				</h2>
				<ul class="mt-3 space-y-2 text-sm">
					<li>
						<a href={resolve('/docs')} class="text-muted-foreground hover:text-foreground">
							Getting started
						</a>
					</li>
					<li>
						<a href={resolve('/docs/tokens')} class="text-muted-foreground hover:text-foreground">
							Design tokens
						</a>
					</li>
					<li>
						<a href={resolve('/components')} class="text-muted-foreground hover:text-foreground">
							Components
						</a>
					</li>
				</ul>
			</nav>

			<nav aria-label="Components">
				<h2 class="text-xs font-medium tracking-widest text-muted-foreground uppercase">
					Components
				</h2>
				<ul class="mt-3 space-y-2 text-sm">
					{#each implementedComponents as component (component.href)}
						<li>
							<a href={resolve(component.href)} class="text-muted-foreground hover:text-foreground">
								{component.name}
							</a>
						</li>
					{/each}
					<li>
						<span class="inline-flex items-center gap-2 text-muted-foreground">
							More in progress
							<span
								class="rounded-full border border-border px-1.5 py-0.5 text-[10px] font-medium tracking-wide uppercase"
							>
								planned
							</span>
						</span>
					</li>
				</ul>
			</nav>

			<nav aria-label="Project">
				<h2 class="text-xs font-medium tracking-widest text-muted-foreground uppercase">Project</h2>
				<ul class="mt-3 space-y-2 text-sm">
					<li>
						<a
							href={GITHUB_URL}
							target="_blank"
							rel="external noopener noreferrer"
							class="text-muted-foreground hover:text-foreground"
						>
							GitHub
							<span class="sr-only">(opens in a new tab)</span>
						</a>
					</li>
					<li>
						<a href={resolve('/docs#license')} class="text-muted-foreground hover:text-foreground">
							License
						</a>
					</li>
					<li>
						<a
							href={resolve('/docs#contributing')}
							class="text-muted-foreground hover:text-foreground"
						>
							Contributing
						</a>
					</li>
					<li>
						<span class="inline-flex items-center gap-2 text-muted-foreground">
							npm
							<span
								class="rounded-full border border-border px-1.5 py-0.5 text-[10px] font-medium tracking-wide uppercase"
							>
								pre-release
							</span>
						</span>
						<span class="sr-only">{NPM_PACKAGE} is not published to npm yet.</span>
					</li>
				</ul>
			</nav>
		</div>

		<div
			class="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between"
		>
			<p>© {year} {SITE_NAME}. Released under the MIT license.</p>
			<p>Built with Svelte 5 and Tailwind CSS v4.</p>
		</div>
	</div>
</footer>
