module.exports = async (req, res) => {
  const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
  const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

  const sendSVG = (svg) => {
    res.writeHead(200, {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "no-cache, no-store, must-revalidate"
    });
    res.end(svg);
  };

  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="350" height="200" viewBox="0 0 350 200">
        <defs>
          <style>
            .bg { fill: #1DB954; }
            .text { fill: white; font-family: Arial, sans-serif; }
            .title { font-size: 18px; font-weight: bold; }
            .subtitle { font-size: 14px; }
          </style>
        </defs>
        <rect class="bg" width="350" height="200" rx="12"/>
        <text x="20" y="60" class="text title">🎵 Spotify Widget</text>
        <text x="20" y="90" class="text subtitle">Missing credentials</text>
        <text x="20" y="120" class="text subtitle">Configure SPOTIFY_* env vars</text>
      </svg>
    `;
    return sendSVG(svg);
  }

  try {
    // Get new access token using refresh token
    const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `grant_type=refresh_token&refresh_token=${REFRESH_TOKEN}`
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="350" height="200" viewBox="0 0 350 200">
          <defs>
            <style>
              .bg { fill: #191414; }
              .text { fill: #1DB954; font-family: Arial, sans-serif; }
            </style>
          </defs>
          <rect class="bg" width="350" height="200" rx="12"/>
          <text x="20" y="100" class="text" font-size="14">Error refreshing token</text>
        </svg>
      `;
      return sendSVG(svg);
    }

    const accessToken = tokenData.access_token;

    // Get current playing track
    const trackResponse = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    });

    const trackData = await trackResponse.json();

    let svg;

    if (!trackData.item) {
      svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="350" height="200" viewBox="0 0 350 200">
          <defs>
            <style>
              .bg { fill: #191414; }
              .spotify-green { fill: #1DB954; }
              .text { fill: white; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; }
              .title { font-size: 20px; font-weight: bold; }
              .subtitle { font-size: 14px; opacity: 0.8; }
            </style>
          </defs>
          <rect class="bg" width="350" height="200" rx="12"/>
          <circle class="spotify-green" cx="40" cy="40" r="20"/>
          <text x="20" y="110" class="text title">Not Playing</text>
          <text x="20" y="140" class="text subtitle">No song is currently playing</text>
        </svg>
      `;
    } else {
      const track = trackData.item;
      const song = track.name.length > 30 ? track.name.substring(0, 27) + "..." : track.name;
      const artist = track.artists.map(a => a.name).join(", ");
      const displayArtist = artist.length > 40 ? artist.substring(0, 37) + "..." : artist;
      const albumCover = track.album.images[0]?.url || "";

      const progressPercent = (trackData.progress_ms / track.duration_ms) * 100;

      svg = `
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="350" height="200" viewBox="0 0 350 200">
          <defs>
            <style>
              .bg { fill: #191414; }
              .cover { opacity: 0.3; }
              .spotify-green { fill: #1DB954; }
              .text { fill: white; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; }
              .title { font-size: 16px; font-weight: bold; }
              .subtitle { font-size: 13px; opacity: 0.8; }
              .progress-bg { fill: #404040; }
              .progress-bar { fill: #1DB954; }
            </style>
            ${albumCover ? `<image id="cover" xlink:href="${albumCover}" width="80" height="80"/>` : ""}
          </defs>

          <rect class="bg" width="350" height="200" rx="12"/>

          <!-- Album Cover -->
          ${albumCover ? `<use xlink:href="#cover" x="20" y="20" class="cover" width="80" height="80"/>` : `<rect x="20" y="20" width="80" height="80" fill="#404040" rx="4"/>`}

          <!-- Spotify Icon -->
          <circle class="spotify-green" cx="32" cy="32" r="12"/>

          <!-- Song Info -->
          <text x="110" y="45" class="text title">${escapeXml(song)}</text>
          <text x="110" y="70" class="text subtitle">${escapeXml(displayArtist)}</text>

          <!-- Progress Bar -->
          <rect x="110" y="140" width="220" height="4" class="progress-bg" rx="2"/>
          <rect x="110" y="140" width="${220 * progressPercent / 100}" height="4" class="progress-bar" rx="2"/>

          <!-- Now Playing Indicator -->
          <text x="110" y="165" class="text subtitle">🎵 Now Playing</text>
          <text x="320" y="165" class="text subtitle" text-anchor="end">${formatTime(trackData.progress_ms)}/${formatTime(track.duration_ms)}</text>
        </svg>
      `;
    }

    return sendSVG(svg);
  } catch (error) {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="350" height="200" viewBox="0 0 350 200">
        <defs>
          <style>
            .bg { fill: #191414; }
            .text { fill: #1DB954; font-family: Arial, sans-serif; }
          </style>
        </defs>
        <rect class="bg" width="350" height="200" rx="12"/>
        <text x="20" y="100" class="text" font-size="14">Error: ${error.message.substring(0, 40)}</text>
      </svg>
    `;
    return sendSVG(svg);
  }
};

function escapeXml(str) {
  return str.replace(/[<>&'"]/g, function(c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

function formatTime(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}
