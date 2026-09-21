module.exports = async (req, res) => {
  const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
  const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

  const results = {
    hasClientId: !!CLIENT_ID,
    hasClientSecret: !!CLIENT_SECRET,
    hasRefreshToken: !!REFRESH_TOKEN,
    tests: {}
  };

  const sendJSON = (statusCode, data) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  };

  // Test 1: Check if credentials exist
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    return sendJSON(400, {
      ...results,
      error: "Missing one or more environment variables",
      message: `Missing: ${!CLIENT_ID ? 'CLIENT_ID ' : ''}${!CLIENT_SECRET ? 'CLIENT_SECRET ' : ''}${!REFRESH_TOKEN ? 'REFRESH_TOKEN' : ''}`
    });
  }

  try {
    // Test 2: Try to get access token
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
    results.tests.tokenRefresh = {
      success: !tokenData.error,
      error: tokenData.error || null
    };

    if (tokenData.error) {
      return sendJSON(400, {
        ...results,
        error: "Failed to refresh token",
        message: tokenData.error_description || tokenData.error
      });
    }

    const accessToken = tokenData.access_token;

    // Test 3: Try to get current user
    const userResponse = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    });

    const userData = await userResponse.json();
    results.tests.getCurrentUser = {
      success: !userData.error,
      username: userData.display_name || userData.external_urls?.spotify || null,
      error: userData.error || null
    };

    if (userData.error) {
      return sendJSON(400, {
        ...results,
        error: "Failed to get user info",
        message: userData.error?.message || "Unknown error"
      });
    }

    // Test 4: Try to get currently playing
    const playingResponse = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    });

    const playingData = await playingResponse.json();
    results.tests.getCurrentlyPlaying = {
      success: playingResponse.ok,
      isPlaying: playingData.is_playing || false,
      songName: playingData.item?.name || "Not playing",
      error: playingData.error || null
    };

    return sendJSON(200, {
      ...results,
      success: true,
      message: "All credentials are valid! ✅"
    });
  } catch (error) {
    return sendJSON(500, {
      ...results,
      error: error.message,
      success: false
    });
  }
};
