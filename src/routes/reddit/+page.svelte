<script>
	// @ts-nocheck
	import Image from '$lib/Image.svelte';

	let subreddit = 'r/';
	let option = 'hot';
	let images = [];
	let message = 'Search a subreddit for images.';
	let loading = false;
	let error = false;
	let after = '';

	function inView(e) {
		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				getRes();
			}
		}, {});

		observer.observe(e);
	}

	function handleKeydown(event) {
		if (event.keyCode === 13) {
			images = [];
			after = '';
			getRes();
		}
	}

	function search() {
		images = [];
		after = '';
		getRes();
	}

	async function getRes() {
		loading = true;
		const res = await fetch(
			`https://www.reddit.com/r/${subreddit.replace('r/', '')}/${option}.json?after=${after}`
		);
		if (res.ok) {
			const data = await res.json();
			after = data.data.after;
			console.log(after);
			for (const child of data.data.children) {
				if (child.data.post_hint === 'image') {
					images = [...images, child.data.url];
				}
			}
		} else {
			error = true;
		}
		if (!images.length) {
			message = 'No images found in this subreddit.';
		}
		loading = false;
	}
</script>

<div class="text-center m-10">
	<input
		class="px-3 py-2 min-w-[80%] md:min-w-[400px] md:hover:min-w-[500px] duration-500 bg-crust rounded shadow-md"
		type="text"
		bind:value={subreddit}
		on:keydown={handleKeydown}
		placeholder="r/"
	/>
	<button
		on:click={search}
		class="px-3 py-2 bg-lavender hover:bg-sky duration-300 rounded shadow-md"
		><i class="fa-solid fa-magnifying-glass dark:text-crust" /></button
	>
</div>
<div id="options" class="flex m-10 relative">
	<div class="flex-grow" />
	<select bind:value={option} class="p-2 bg-crust rounded">
		<option value="hot">Hot</option>
		<option value="new">New</option>
		<option value="top">Top</option>
		<option value="rising">Rising</option>
	</select>
</div>
<div class="m-10">
	{#if images.length}
		<div class="flex flex-wrap justify-around">
			{#each images as image}
				<Image src={image} />
			{/each}
		</div>
		<div use:inView />
	{:else}
		<div class="text-center text-xl">{message}</div>
	{/if}
	{#if loading}
		<div class="text-5xl my-10 text-center">
			<i class="fa-solid fa-rotate-right animate-spin" />
		</div>
	{/if}
</div>
