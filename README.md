# Spobot

Spobot, Discord botu ve Spotify entegrasyonu sağlayan bir uygulamadır. Bu bot, Spotify'da çalan şarkıyı Discord durumunuza yansıtır.

## Kurulum

### Gereksinimler
- Node.js (v14 veya üzeri)
- Bir Spotify geliştirici hesabı
- Bir Discord botu

### Adımlar
1. Bu projeyi klonlayın veya indirin:
   ```bash
   git clone https://github.com/blackeker/spobo)
   cd spobot
   ```

2. Gerekli bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

3. `config.json` dosyasını düzenleyin:
   ```json
   {
     "SPOTIFY_ID": "Spotify Client ID",
     "SPOTIFY_SECRET": "Spotify Client Secret",
     "SPOTIFY_TOKEN": "Spotify Refresh Token",
     "DISCORD_TOKEN": "Discord Bot Token"
   }
   ```

4. Spotify Refresh Token almak için `tokenGen.js` dosyasını çalıştırın:
   ```bash
   node tokenGen.js
   ```
   Tarayıcınızda verilen URL'yi açın, giriş yapın ve izinleri onaylayın. Alınan token otomatik olarak `config.json` dosyasına kaydedilecektir.

5. Botu başlatın:
   ```bash
   node index.js
   ```

## Kullanım
- Bot çalıştırıldığında, Spotify'da çalan şarkı Discord durumunuza yansıtılır.

---


**Bu proje Blackeker tarafından geliştirilmiştir.**
