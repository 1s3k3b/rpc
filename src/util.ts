import { Client } from 'discord.js';
import fetch from 'node-fetch';
import constants from './constants';
import { Playlist, Video } from './types';

const format = (n: Date | string | number) => ['object', 'string'].includes(typeof n)
    ? new Date(n).getFullYear()
    : (+(+n).toFixed(+!(~~n === n || n > 999)) || 0).toLocaleString('en');

export const getHanime = <T>(base: keyof typeof constants.HANIME, str: any = ''): Promise<T> => fetch(constants.HANIME[base] + str, {
    headers: {
        'x-signature': decodeURIComponent(Array.from({ length: 32 }, () => '%' + [~~(Math.random() * 9) + 31, ~~(Math.random() * 6) + 61][~~(Math.random() * 2)]).join('')),
        'x-signature-version': 'web2',
        'Content-Type': 'application/json',
    },
})
    .then(d => d.json());

export const fetchHanimePlaylist = async (id: string) => {
    let data: Playlist;
    const vids: Video[] = [];
    while (!vids.length || vids.length < data!.fapi.meta.total) {
        vids.push(
            ...await getHanime<Playlist>(
                'PLAYLIST',
                `${id}&__order=sequence,DESC&__offset=${vids.length}&__count=99999999999&personalized=1`,
            )
                .then(d => (data = d) && Promise.all(
                    d.fapi?.data
                        .filter(x => [...vids.map(x => x.hentai_video), ...d.fapi.data].filter(y => y.id === x.id).length === 1)
                        .map(x => getHanime<Video>('VIDEO', x.id)) || []
                    ))
        );
        if (!data!.fapi) break;
    }
    return vids;
};

export const getHanimeVideo = async (vids: Video[]) => {
    const vid = vids[~~(Math.random() * vids.length)];
    return {
        details: 'Watching ' + vid.hentai_video.name,
        state: `${format(vid.hentai_video.likes)} 👍 / ${format(vid.hentai_video.dislikes)} 👎 | #${format(vid.hentai_video.monthly_rank)} monthly | By ${vid.brand.title}`,
    };
};

export const getSpotifySong = async (client: Client, id: string) => {
    const song = (await client.users.fetch(id)).presence.activities
        .find(x => x.type === 'LISTENING' && x.name === 'Spotify' && x.assets?.largeImage?.startsWith('spotify:'));
    if (song) {
        const artists = song.state!.split('; ');
        return {
            details: 'Listening to ' + song.details,
            state: `By ${artists[0]} | On ${song.assets!.largeText}${artists.length > 1 ? ' | Featuring ' + artists.slice(1).join(', ') : ''}`,
        };
    }
};