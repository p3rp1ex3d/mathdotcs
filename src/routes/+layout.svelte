<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { theme } from '$lib/stores/themeStore.js';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		const savedTheme =
			typeof window !== 'undefined'
				? localStorage.getItem('math-cs-theme') || 'illustration'
				: 'terminal';

		theme.setTheme(savedTheme);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="description" content="Math.CS - Learn mathematics, computer science, and technology through interactive content and practical examples." />
	<title>Math.CS - Learn Mathematics & Computer Science</title>
</svelte:head>

<div class="app">
	{@render children()}
</div>

<style global>
	:global(html) {
		scroll-behavior: smooth;
	}

	:global(body) {
		margin: 0;
		padding: 0;
		font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
	}

	:global([data-theme='terminal'] body) {
		background-color: #0a0a0f;
		color: #e5e5ea;
	}

	:global([data-theme='illustration'] body) {
		background-color: #f3e8ff;
		color: #4c1d95;
		font-family: 'Inter', sans-serif;
	}

	:global([data-theme='minimal'] body) {
		background-color: #ffffff;
		color: #111827;
		font-family: 'Inter', sans-serif;
	}

	:global(a) {
		color: inherit;
		text-decoration: none;
	}

	:global(button) {
		cursor: pointer;
		border: none;
	}
</style>