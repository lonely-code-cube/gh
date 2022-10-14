<script>
	// @ts-nocheck
	export let src;
	export let source;
	let downloaded = false;
	let copied = false;
	let optionsVisible = false;

	async function download() {
		const image = await fetch(`/api/imagedownload?src=${src}`);
		const imageBlog = await image.blob();
		const imageURL = URL.createObjectURL(imageBlog);

		const link = document.createElement('a');
		link.href = imageURL;
		link.download = src.split('/')[src.split('/').length - 1];
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		downloaded = true;
		setTimeout(() => {
			downloaded = false;
		}, 5000);
	}

	function copy() {
		navigator.clipboard.writeText(src);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 5000);
	}
</script>

<div
	on:mouseenter={() => {
		optionsVisible = true;
	}}
	on:mouseleave={() => {
		optionsVisible = false;
	}}
	class="relative max-w-[95%] md:max-w-[350px] h-min my-3 p-1 bg-surface1 shadow-md"
>
	<div class={optionsVisible ? '' : 'hidden'}>
		<button
			on:click={download}
			class="absolute left-3 top-3 px-2 py-1 bg-surface0 bg-opacity-70 rounded-lg hover:bg-opacity-100"
			><i class="fa-solid fa-download {downloaded ? 'text-green' : ''}" /></button
		>
		<button
			on:click={copy}
			class="absolute left-12 top-3 px-2 py-1 bg-surface0 bg-opacity-70 rounded-lg hover:bg-opacity-100"
			><i class="fa-solid fa-link {copied ? 'text-green' : ''}" /></button
		>
		<a
			href={source}
			target="_blank"
			class="absolute left-[5.5rem] top-3 px-2 py-1 bg-surface0 bg-opacity-70 rounded-lg hover:bg-opacity-100"
			><i class="fa-solid fa-arrow-up-right-from-square" /></a
		>
		<button
			class="hidden md:block absolute left-[7.6rem] top-3 px-2 py-1 bg-surface0 bg-opacity-70 rounded-lg hover:bg-opacity-100"
			><i class="fa-solid fa-magnifying-glass-plus" /></button
		>
	</div>
	<img {src} alt="" loading="lazy" />
</div>
