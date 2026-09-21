module.exports = async (req, res) => {
  const { code } = req.query;

  const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

  if (!code) {
    return res.status(400).json({ error: "No authorization code received" });
  }

  if (!CLIENT_ID || !CLIENT_SECRET) {
    return res.status(400).json({ error: "Missing CLIENT_ID or CLIENT_SECRET env vars" });
  }

  try {
    const REDIRECT_URI = "https://github-spotify-eight.vercel.app/api/auth-callback";

    const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      return res.status(400).json({
        error: "Failed to get tokens",
        details: tokenData.error_description
      });
    }

    // Return the refresh token
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Spotify Token</title>
        <style>
          body { font-family: Arial; background: #191414; color: white; padding: 40px; }
          .container { max-width: 600px; margin: 0 auto; background: #282828; padding: 30px; border-radius: 10px; }
          h1 { color: #1DB954; }
          .token-box { background: #121212; padding: 15px; border-radius: 5px; margin: 20px 0; word-break: break-all; font-family: monospace; }
          .success { color: #1DB954; }
          .instructions { margin-top: 20px; line-height: 1.6; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>✅ Authorization Successful!</h1>

          <p class="success"><strong>Your Refresh Token:</strong></p>
          <div class="token-box">${tokenData.refresh_token}</div>

          <div class="instructions">
            <h3>Next Steps:</h3>
            <ol>
              <li>Copy the refresh token above</li>
              <li>Go to Vercel Dashboard → github-spotify → Settings → Environment Variables</li>
              <li>Add/Update these variables:
                <ul>
                  <li><code>SPOTIFY_CLIENT_ID</code> = (already set)</li>
                  <li><code>SPOTIFY_CLIENT_SECRET</code> = (already set)</li>
                  <li><code>SPOTIFY_REFRESH_TOKEN</code> = (paste the token above)</li>
                </ul>
              </li>
              <li>Redeploy your project</li>
              <li>Test at: <code>/api/test-spotify</code> or <code>/api/spotify-card</code></li>
            </ol>
          </div>
        </div>
      </body>
      </html>
    `;

    res.setHeader("Content-Type", "text/html");
    res.send(html);
  } catch (error) {
    res.status(500).json({
      error: "Server error",
      message: error.message
    });
  }
};
