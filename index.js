module.exports = async (req, res) => {
  // Root path - redirect to API endpoints info
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Spotify Widget API</title>
      <style>
        body { font-family: Arial; background: #191414; color: white; padding: 40px; }
        .container { max-width: 600px; margin: 0 auto; }
        h1 { color: #1DB954; }
        code { background: #282828; padding: 5px 10px; border-radius: 4px; }
        a { color: #1DB954; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🎵 Spotify Widget API</h1>
        <p>Available endpoints:</p>
        <ul>
          <li><code>/api/hello</code> - Test endpoint</li>
          <li><code>/api/test-spotify</code> - Test Spotify credentials</li>
          <li><code>/api/authorize</code> - Get Spotify refresh token</li>
          <li><code>/api/spotify-card</code> - Get now playing card</li>
        </ul>
      </div>
    </body>
    </html>
  `;
  res.setHeader('Content-Type', 'text/html');
  res.send(html);
};
