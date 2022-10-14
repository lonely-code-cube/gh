// @ts-nocheck

import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').} */
export async function GET({ url, fetch }) {
    const subreddit = url.searchParams.get('subreddit') ?? '';
    const after = url.searchParams.get('after') ?? '';
    const option = url.searchParams.get('option') ?? 'hot';


    const res = await fetch(
        `https://www.reddit.com/r/${subreddit.replace('r/', '')}/${option}.json?after=${after}`
    );
    if (res.ok) {
        const data = await res.json();
        return json(data);
    }
    throw error(res.status, (await res.json()).message);
}