module.exports = async (req, res) => {
  const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
  const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    return res.status(400).json({ error: "Missing Spotify credentials" });
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
      return res.status(400).json({ error: "Failed to refresh token" });
    }

    const accessToken = tokenData.access_token;

    // Get current playing track
    const trackResponse = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    });

    const trackData = await trackResponse.json();

    if (!trackData.item) {
      return res.json({
        isPlaying: false,
        message: "Not playing anything right now"
      });
    }

    const track = trackData.item;

    return res.json({
      isPlaying: trackData.is_playing,
      song: track.name,
      artist: track.artists.map(a => a.name).join(", "),
      album: track.album.name,
      albumCover: track.album.images[0]?.url,
      url: track.external_urls.spotify,
      progress: trackData.progress_ms,
      duration: track.duration_ms
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
