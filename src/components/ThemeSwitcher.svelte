<script>
	import { theme } from '$lib/stores/themeStore.js';
	import { onMount } from 'svelte';

	let themes = [];
	let currentTheme = 'terminal';
	let showMenu = false;

	onMount(() => {
		themes = theme.getThemes();

		if (typeof window !== 'undefined') {
			currentTheme = localStorage.getItem('math-cs-theme') || 'terminal';
			document.documentElement.setAttribute('data-theme', currentTheme);
		}
	});

	$: if (currentTheme) {
		updateTheme();
	}

	function updateTheme() {
		theme.setTheme(currentTheme);
		document.documentElement.setAttribute('data-theme', currentTheme);
		localStorage.setItem('math-cs-theme', currentTheme);
	}

	function handleThemeChange(themeName) {
		currentTheme = themeName;
		showMenu = false;
	}
</script>

<div class="theme-switcher">
	<button
		class="theme-button"
		on:click={() => (showMenu = !showMenu)}
		title="Switch theme"
		aria-label="Theme menu"
	>
		<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<circle cx="12" cy="12" r="5" />
			<line x1="12" y1="1" x2="12" y2="3" />
			<line x1="12" y1="21" x2="12" y2="23" />
			<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
			<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
			<line x1="1" y1="12" x2="3" y2="12" />
			<line x1="21" y1="12" x2="23" y2="12" />
			<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
			<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
		</svg>
	</button>

	{#if showMenu}
		<div class="theme-menu">
			{#each themes as themeOption}
				<button
					class="theme-option {currentTheme === themeOption.value ? 'active' : ''}"
					on:click={() => handleThemeChange(themeOption.value)}
				>
					<span class="theme-name">{themeOption.name}</span>
					<span class="theme-desc">{themeOption.description}</span>
					{#if currentTheme === themeOption.value}
						<span class="checkmark">✓</span>
					{/if}
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.theme-switcher {
		position: relative;
		display: inline-block;
	}

	.theme-button {
		padding: 0.5rem;
		background: none;
		border: 1px solid currentColor;
		border-radius: 0.375rem;
		cursor: pointer;
		color: inherit;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s;
	}

	.theme-button:hover {
		opacity: 0.8;
		transform: scale(1.05);
	}

	.theme-menu {
		position: absolute;
		top: calc(100% + 0.5rem);
		right: 0;
		background: inherit;
		border: 1px solid currentColor;
		border-radius: 0.75rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		min-width: 250px;
		z-index: 1000;
		overflow: hidden;
	}

	.theme-option {
		width: 100%;
		padding: 1rem;
		background: none;
		border: none;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		cursor: pointer;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.25rem;
		text-align: left;
		transition: all 0.2s;
		position: relative;
	}

	.theme-option:last-child {
		border-bottom: none;
	}

	.theme-option:hover {
		background-color: rgba(0, 0, 0, 0.05);
	}

	.theme-option.active {
		background-color: rgba(0, 0, 0, 0.1);
		font-weight: 600;
	}

	.theme-name {
		font-weight: 600;
		font-size: 0.95rem;
	}

	.theme-desc {
		font-size: 0.8rem;
		opacity: 0.6;
	}

	.checkmark {
		position: absolute;
		right: 1rem;
		top: 50%;
		transform: translateY(-50%);
		font-size: 1.2rem;
	}

	/* 🔥 FIXED GLOBAL THEMES */

	:global([data-theme='terminal']) .theme-button,
	:global([data-theme='terminal']) .theme-menu {
		border-color: #60a5fa;
		color: #e5e5ea;
	}

	:global([data-theme='terminal']) .theme-button:hover {
		background-color: rgba(96, 165, 250, 0.1);
	}

	:global([data-theme='terminal']) .theme-option:hover {
		background-color: rgba(96, 165, 250, 0.1);
	}

	:global([data-theme='terminal']) .theme-option.active {
		background-color: rgba(96, 165, 250, 0.2);
	}

	:global([data-theme='illustration']) .theme-button {
		border-color: #a855f7;
		color: #a855f7;
	}

	:global([data-theme='illustration']) .theme-button:hover {
		background-color: rgba(168, 85, 247, 0.1);
	}

	:global([data-theme='illustration']) .theme-option:hover {
		background-color: rgba(168, 85, 247, 0.08);
	}

	:global([data-theme='illustration']) .theme-option.active {
		background-color: rgba(168, 85, 247, 0.15);
	}

	:global([data-theme='minimal']) .theme-button {
		border-color: #1f2937;
		color: #1f2937;
	}

	:global([data-theme='minimal']) .theme-button:hover {
		background-color: #f3f4f6;
	}

	:global([data-theme='minimal']) .theme-option:hover {
		background-color: #f9fafb;
	}

	:global([data-theme='minimal']) .theme-option.active {
		background-color: #f3f4f6;
	}
</style>