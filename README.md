# RPC
A customizable Discord RPC app written in TypeScript.<br>
Whenever the status updates, there is a 50% chance the status will display the song the user is currently listening to on Spotify (if any), otherwise, a random hanime video is picked from the specified playlist.

# Installation
- Install Node.js if you haven't already
- Clone or download the repository
- Run `npm i && npm i typescript -g`
- Create a `config.json` file, follow the [config template](#config)
- To run it, run `npm run start`

# Config
```json
{
    "clientID": "<RPC app ID>",
    "botToken": "<Discord bot token>",
    "hanimePlaylist": "<Hanime playlist ID>",
    "interval": <time between changing activities (in milliseconds)>,
    "buttons": [
        {
            "label": "<Text>",
            "url": "<Url>"
        }
    ]
}
```