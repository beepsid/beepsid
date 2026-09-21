module.exports = async (req, res) => {
  const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;

  if (!CLIENT_ID) {
    return res.status(400).json({ error: "SPOTIFY_CLIENT_ID not set" });
  }

  const REDIRECT_URI = "https://github-spotify-eight.vercel.app/api/auth-callback";
  const SCOPE = "user-read-currently-playing";

  const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPE)}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Spotify Authorization</title>
      <style>
        body {
          font-family: Arial;
          background: linear-gradient(135deg, #191414 0%, #1DB954 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          margin: 0;
        }
        .container {
          background: white;
          padding: 50px;
          border-radius: 15px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
          text-align: center;
          max-width: 400px;
        }
        h1 { color: #191414; margin: 0 0 20px; }
        p { color: #666; margin-bottom: 30px; }
        .btn {
          background: #1DB954;
          color: white;
          padding: 15px 40px;
          border: none;
          border-radius: 30px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: background 0.3s;
        }
        .btn:hover { background: #1ed760; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🎵 Authorize Spotify</h1>
        <p>Click below to authorize your Spotify account and get your refresh token</p>
        <a href="${authUrl}" class="btn">Authorize with Spotify</a>
      </div>
    </body>
    </html>
  `;

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(html);
};
