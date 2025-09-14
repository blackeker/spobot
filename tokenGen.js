const http = require('http');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const SPOTIFY_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:8888/callback';

const configPath = path.join(__dirname, 'config.json');

http.createServer(async (req, res) => {
    if (req.url.startsWith('/callback')) {
        const urlParams = new URL(req.url, `http://localhost:8888`).searchParams;
        const code = urlParams.get('code');

        if (code) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Kod alındı. Terminale bakın.');

            try {
                const response = await axios.post('https://accounts.spotify.com/api/token', null, {
                    params: {
                        grant_type: 'authorization_code',
                        code: code,
                        redirect_uri: REDIRECT_URI,
                        client_id: SPOTIFY_ID,
                        client_secret: SPOTIFY_SECRET
                    },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });

                const refreshToken = response.data.refresh_token;
                console.log('Refresh Token: ', refreshToken);

                const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
                config.SPOTIFY_TOKEN = refreshToken;
                fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

                console.log('Refresh token config.json dosyasına kaydedildi.');
            } catch (error) {
                console.error('Hata oluştu:', error.response ? error.response.data : error.message);
            }
        } else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Kod bulunamadı.');
        }
    }
}).listen(8888, () => {
    console.log('Sunucu çalışıyor: http://localhost:8888');
    console.log(`Lütfen aşağıdaki URL'yi tarayıcınızda açın ve giriş yapın:`);
    console.log(`https://accounts.spotify.com/authorize?client_id=${SPOTIFY_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=user-read-currently-playing`);
});