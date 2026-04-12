import { fetchYouTubeVideos } from '$lib/blogLoader.js';

export async function load({ fetch }) {

	const videos = await fetchYouTubeVideos(fetch);


	return {
		videos
	};
}