import { writable } from 'svelte/store';

const THEME_KEY = 'math-cs-theme';
const THEMES = {
	terminal: {
		name: 'Terminal Dark',
		value: 'terminal',
		description: 'Dark terminal aesthetic'
	}
};

// Get initial theme from localStorage or default to 'terminal'
function getInitialTheme() {
	if (typeof window !== 'undefined') {
		return localStorage.getItem(THEME_KEY) || 'terminal';
	}
	return 'terminal';
}

// Create theme store
function createThemeStore() {
	const { subscribe, set } = writable(getInitialTheme());

	return {
		subscribe,
		setTheme: (theme) => {
			if (THEMES[theme]) {
				set(theme);
				if (typeof window !== 'undefined') {
					document.documentElement.setAttribute('data-theme', 'terminal');
				}
			}
		},
		getThemes: () => Object.values(THEMES),
		getTheme: (key) => THEMES[key]
	};
}

export const theme = createThemeStore();
