const config = require('./config.json');
const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
let lastTrack = null;

async function getSpotifyAccessToken() {
    const response = await axios.post('https://accounts.spotify.com/api/token', null, {
        params: {
            grant_type: 'refresh_token',
            refresh_token: config.SPOTIFY_TOKEN,
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(`${config.SPOTIFY_ID}:${config.SPOTIFY_SECRET}`).toString('base64')}`,
        },
    });
    return response.data.access_token;
}

async function getCurrentlyPlayingTrack() {
    const accessToken = await getSpotifyAccessToken();
    const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (response.status === 200 && response.data.is_playing) {
        const track = response.data.item;
        return ` ${track.name} - ${track.artists.map(artist => artist.name).join(', ')}`;
    } else {
        return 'Spotify\'da bir şey çalmıyor.';
    }
}

async function updateDiscordStatus() {
    try {
        const status = await getCurrentlyPlayingTrack();
        if (status && status !== lastTrack) {
            await client.user.setActivity(status, { type: 2 });
            lastTrack = status;
        }
    } catch (error) {
        console.error('Durum güncellenirken hata oluştu:', error);
    }
}

client.once('clientReady', () => {
    setInterval(updateDiscordStatus, 15000);
    console.log('Girilen bot : ' + client.user.tag);
    console.log('Made by Blackeker');
});

client.login(config.DISCORD_TOKEN);
