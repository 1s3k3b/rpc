import { Client } from 'discord-rpc';
import { Client as DiscordClient, Intents } from 'discord.js';
import { fetchHanimePlaylist, getHanimeVideo, getSpotifySong } from './util';
import config from '../config.json';

const client = new Client({ transport: 'ipc' });
const discordClient = new DiscordClient({
    ws: { intents: Intents.ALL },
});
const hanimePlaylist = fetchHanimePlaylist(config.hanimePlaylist);

const setActivity = async () => client.setActivity({
    ...Math.random() > 0.5 && await getSpotifySong(discordClient, client.user.id) || await getHanimeVideo(await hanimePlaylist),
    buttons: config.buttons,
});
    
Promise
    .all(
        [discordClient, client]
            .map(client => new Promise<void>(r => client.on('ready', r)))
    )
    .then(() => {
        setActivity();
        setInterval(setActivity, config.interval);
    });

client.login({ clientId: config.clientID });
discordClient.login(config.botToken);