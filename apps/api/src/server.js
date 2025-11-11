import http from 'node:http';

export function createServer() {
  return http.createServer((req, res) => {
    if (req.url === '/healthz') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok' }));
      return;
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not Found' }));
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const server = createServer();
  const port = process.env.API_PORT || 4000;
  server.listen(port, () => {
    console.log(`API server listening on http://localhost:${port}`);
  });
}
