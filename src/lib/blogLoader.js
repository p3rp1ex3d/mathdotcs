const GITHUB_OWNER = import.meta.env.VITE_GITHUB_OWNER;
const GITHUB_REPO = import.meta.env.VITE_GITHUB_REPO;
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

function getHeaders() {
	const headers = {
		Accept: 'application/vnd.github.v3+json'
	};
	if (GITHUB_TOKEN) {
		headers.Authorization = `token ${GITHUB_TOKEN}`;
	}
	return headers;
}

function parseFrontmatter(content) {
	const match = content.match(/^---\n([\s\S]*?)\n---/);
	const frontmatter = match ? match[1] : '';
	const markdown = content.replace(/^---\n[\s\S]*?\n---\n?/, '');

	const metadata = {};
	frontmatter.split('\n').forEach(line => {
		const i = line.indexOf(':');
		if (i > -1) {
			const key = line.slice(0, i).trim();
			const value = line.slice(i + 1).trim();
			metadata[key] = value;
		}
	});

	return { metadata, content: markdown };
}

export async function fetchBlogPosts(fetchFn = fetch) {
	try {
		const res = await fetchFn(
			`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents`,
			{ headers: getHeaders() }
		);

		if (!res.ok) return [];

		const files = await res.json();

		const markdownFiles = files.filter(
			f => f.name.endsWith('.md') && f.name !== 'youtube_videos.md'
		);

		const posts = await Promise.all(
			markdownFiles.map(async file => {
				try {
					const fileRes = await fetchFn(file.url, { headers: getHeaders() });
					if (!fileRes.ok) return null;

					const fileData = await fileRes.json();
					const content = atob(fileData.content);

					const { metadata, content: md } = parseFrontmatter(content);

					return {
						slug: file.name.replace('.md', ''),
						title: metadata.title || 'Untitled',
						category: metadata.category || 'General',
						date: metadata.date || '',
						excerpt: metadata.excerpt || '',
						content: md
					};
				} catch {
					return null;
				}
			})
		);

		return posts.filter(Boolean);
	} catch {
		return [];
	}
}

export async function fetchBlogPost(slug, fetchFn = fetch) {
	const posts = await fetchBlogPosts(fetchFn);
	return posts.find(p => p.slug === slug) || null;
}

export async function getRelatedArticles(slug, category, limit = 2, fetchFn = fetch) {
	const posts = await fetchBlogPosts(fetchFn);
	return posts
		.filter(p => p.category === category && p.slug !== slug)
		.slice(0, limit);
}

export async function getLatestPosts(limit = 4, fetchFn = fetch) {
	const posts = await fetchBlogPosts(fetchFn);
	return posts.slice(0, limit);
}

export async function fetchYouTubeVideos(fetchFn = fetch) {
	try {
		const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/youtube_videos.json`;

		const res = await fetchFn(url, {
			headers: getHeaders()
		});

		if (!res.ok) {
			return [];
		}

		const fileData = await res.json();

		if (!fileData.content) {
			return [];
		}

		const decoded = atob(fileData.content);

		const videos = JSON.parse(decoded);

		return videos;
	} catch (err) {
		return [];
	}
}