<script>
	import Navbar from '../../components/Navbar.svelte';
	import Footer from '../../components/Footer.svelte';

	export let data;

	let selectedDifficulty = 'All';
	let searchQuery = '';
	let videos = data.videos ?? [];
	let activeVideo = null;

	const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

	$: filteredVideos = videos.filter(video => {
		const matchesDifficulty =
			selectedDifficulty === 'All' || video.difficulty === selectedDifficulty;

		const matchesSearch =
			video.title?.toLowerCase().includes(searchQuery.toLowerCase());

		return matchesDifficulty && matchesSearch;
	});

	function openVideo(video) {
		activeVideo = video;
		document.body.style.overflow = 'hidden';
	}

	function closeVideo() {
		activeVideo = null;
		document.body.style.overflow = 'auto';
	}
</script>

<Navbar />

<div class="min-h-screen bg-[#0a0a0f] text-white pt-24 pb-16">
	<div class="mx-auto max-w-7xl px-4">

		<h1 class="text-5xl font-bold mb-8">Video Library</h1>

		<input
			type="text"
			placeholder="Search videos..."
			bind:value={searchQuery}
			class="w-full mb-6 p-4 bg-[#1e1e2e] border border-gray-700 rounded-xl"
		/>

		<div class="flex gap-3 mb-10 flex-wrap">
			{#each difficulties as d}
				<button
					on:click={() => selectedDifficulty = d}
					class="px-4 py-2 rounded-full border
					{selectedDifficulty === d 
						? 'bg-blue-500 text-white border-blue-500' 
						: 'bg-[#1e1e2e] text-gray-300 border-gray-600'}"
				>
					{d}
				</button>
			{/each}
		</div>

		{#if filteredVideos.length > 0}
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

				{#each filteredVideos as video}
					<div
						on:click={() => openVideo(video)}
						class="cursor-pointer border border-blue-500/40 rounded-xl p-4 bg-[#14141f] hover:border-blue-500 transition"
					>
						<div class="flex flex-col lg:flex-row gap-4">

							<div class="flex-1">
								<iframe
									class="w-full h-[220px] lg:h-[200px] rounded-lg pointer-events-none"
									src={`https://www.youtube.com/embed/${video.youtubeId}`}
								></iframe>
							</div>

							<div class="flex-1 flex flex-col justify-between">

								<div>
									<div class="flex justify-between items-center mb-2">
										<span class="text-xs px-2 py-1 border border-blue-400 rounded text-blue-400">
											{video.difficulty}
										</span>

										<span class="text-xs text-gray-400">
											{video.duration}
										</span>
									</div>

									<h3 class="text-lg font-semibold text-blue-300 mb-2">
										{video.title}
									</h3>

									<p class="text-sm text-gray-400 leading-relaxed line-clamp-4">
										{video.description}
									</p>
								</div>

								<div class="mt-4 border-t border-gray-700 pt-3 flex justify-between text-xs text-gray-500">
									<span>Published</span>
									<span>{video.date}</span>
								</div>

							</div>

						</div>
					</div>
				{/each}

			</div>
		{:else}
			<p class="text-gray-400">No videos found</p>
		{/if}

	</div>
</div>

<!-- 🔥 MODAL -->
{#if activeVideo}
	<div
		class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6"
		on:click={closeVideo}
	>
		<div
			class="bg-[#14141f] border border-blue-500 rounded-xl max-w-5xl w-full p-6 relative"
			on:click|stopPropagation
		>

			<!-- HEADER -->
			<div class="flex justify-between items-center mb-4">
				<span class="text-xs px-2 py-1 border border-blue-400 rounded text-blue-400">
					{activeVideo.difficulty}
				</span>

				<button
					on:click={closeVideo}
					class="text-gray-400 hover:text-white text-xl"
				>
					✕
				</button>
			</div>

			<div class="flex flex-col lg:flex-row gap-6">

				<!-- VIDEO -->
				<div class="flex-1">
					<iframe
						class="w-full h-[300px] lg:h-[350px] rounded-lg"
						src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
						allowfullscreen
					></iframe>
				</div>

				<!-- DETAILS -->
				<div class="flex-1 flex flex-col gap-4">

					<!-- TITLE + DURATION -->
					<div class="flex justify-between items-center">
						<h2 class="text-2xl font-semibold text-blue-300">
							{activeVideo.title}
						</h2>

						<span class="text-sm text-gray-400">
							{activeVideo.duration}
						</span>
					</div>

					<!-- FULL DESCRIPTION -->
					<p class="text-gray-400 leading-relaxed">
						{activeVideo.description}
					</p>

					<!-- FOOTER -->
					<div class="mt-4 border-t border-gray-700 pt-3 flex justify-between text-sm text-gray-500">
						<span>Published</span>
						<span>{activeVideo.date}</span>
					</div>

				</div>

			</div>

		</div>
	</div>
{/if}

<Footer />

<style>
	:global(body) {
		background-color: #0a0a0f;
	}

	.line-clamp-4 {
		display: -webkit-box;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>