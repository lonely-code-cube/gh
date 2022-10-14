// @ts-nocheck

import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').} */
export async function GET({ url, fetch }) {
    const src = url.searchParams.get('src') ?? 'https://i.giphy.com/media/LXONhtCmN32YU/giphy.webp';

    const res = await fetch(src);
    if (res.ok) {
        return new Response(await res.blob());
    }
    throw error(res.status);
}