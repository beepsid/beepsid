const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const queryData = url.parse(req.url, true).query;
  const code = queryData.code;
  
  if (code) {
    console.log("✅ AUTHORIZATION CODE:", code);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(`Got it! Code: ${code}\n\nCopy this code and paste it in the token exchange step.`);
  } else {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Waiting for Spotify redirect...');
  }
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});