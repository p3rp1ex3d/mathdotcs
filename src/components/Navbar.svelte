<script>
	import { page } from '$app/stores';
	let mobileMenuOpen = false;
</script>

<div class="sticky top-0 z-50">
	<div class="flex justify-between items-center py-3 px-6 bg-[#14141f]/80 backdrop-blur-sm font-mono">
		
		<a href="/" class="border-blue-400 border-2 px-4 py-1 rounded-md bg-blue-400 text-white font-bold hover:bg-blue-500 transition-all duration-200 text-base md:text-lg tracking-wide">
			Math.CS
		</a>

		<div class="hidden md:flex items-center gap-2">
			<a
				href="/"
				class="flex items-center gap-2 px-3 py-2 rounded-md transition {$page.url.pathname === '/' ? 'bg-blue-400 text-white' : 'text-gray-400 hover:bg-[#69696920] hover:text-white'}"
			>
				Home
			</a>

			<a
				href="/blog"
				class="flex items-center gap-2 px-3 py-2 rounded-md transition {$page.url.pathname.startsWith('/blog') ? 'bg-blue-400 text-white' : 'text-gray-400 hover:bg-[#69696920] hover:text-white'}"
			>
				Blog
			</a>

			<a
				href="/videos"
				class="flex items-center gap-2 px-3 py-2 rounded-md transition {$page.url.pathname === '/videos' ? 'bg-blue-400 text-white' : 'text-gray-400 hover:bg-[#69696920] hover:text-white'}"
			>
				Videos
			</a>

			<a
				href="/puzzles"
				class="flex items-center gap-2 px-3 py-2 rounded-md transition {$page.url.pathname === '/puzzles' ? 'bg-blue-400 text-white' : 'text-gray-400 hover:bg-[#69696920] hover:text-white'}"
			>
				Puzzles
			</a>
		</div>

		<div class="md:hidden">
			<button
				on:click={() => (mobileMenuOpen = !mobileMenuOpen)}
				class="p-2 rounded-md text-gray-400 hover:text-white hover:bg-[#69696920]"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" d="{mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}" />
				</svg>
			</button>
		</div>
	</div>

	{#if mobileMenuOpen}
		<div class="md:hidden bg-[#14141f] border-t border-gray-700">
			<nav class="flex flex-col">
				<a href="/" class="px-6 py-3 text-gray-400 hover:text-white hover:bg-[#69696920]">Home</a>
				<a href="/blog" class="px-6 py-3 text-gray-400 hover:text-white hover:bg-[#69696920]">Blog</a>
				<a href="/videos" class="px-6 py-3 text-gray-400 hover:text-white hover:bg-[#69696920]">Videos</a>
				<a href="/puzzles" class="px-6 py-3 text-gray-400 hover:text-white hover:bg-[#69696920]">Puzzles</a>
			</nav>
		</div>
	{/if}

	<hr class="border-gray-700" />
</div>