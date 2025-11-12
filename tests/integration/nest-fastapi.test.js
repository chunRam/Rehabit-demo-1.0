import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import { createServer } from '../../apps/api/src/server.js';

const startMockFastApi = async () => {
  const script = `
import json
import sys
from http.server import BaseHTTPRequestHandler, HTTPServer

class Handler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path != '/predict':
            self.send_response(404)
            self.end_headers()
            return

        length = int(self.headers.get('Content-Length', 0))
        raw = self.rfile.read(length or 0)
        payload = {}
        if raw:
            payload = json.loads(raw.decode('utf-8'))

        response = {
            "model": "mock-fastapi",
            "prediction": {
                "recommendedAction": "drink-water",
                "received": payload,
            }
        }
        body = json.dumps(response).encode('utf-8')
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, format, *args):
        return

server = HTTPServer(('127.0.0.1', 0), Handler)
print(server.server_address[1])
sys.stdout.flush()
try:
    server.serve_forever()
finally:
    server.server_close()
`;

  const child = spawn('python3', ['-c', script], {
    stdio: ['ignore', 'pipe', 'inherit'],
  });

  const [portBuffer] = await once(child.stdout, 'data');
  const port = Number.parseInt(portBuffer.toString().trim(), 10);

  return {
    port,
    stop: async () => {
      child.kill();
      try {
        await once(child, 'close');
      } catch {
        // ignore
      }
    },
  };
};

test('NestJS to FastAPI integration flow succeeds', async (t) => {
  const fastApi = await startMockFastApi();
  t.after(async () => fastApi.stop());

  const apiServer = createServer({ mlServiceUrl: `http://127.0.0.1:${fastApi.port}` });
  const port = await new Promise((resolve) => {
    apiServer.listen(0, () => {
      resolve(apiServer.address().port);
    });
  });

  t.after(() =>
    new Promise((resolve, reject) => {
      apiServer.close((error) => {
        if (error) reject(error);
        else resolve();
      });
    }),
  );

  // Allow the HTTP servers to finish bootstrapping on slower CI environments.
  await delay(50);

  const payload = {
    userId: 'user-1234',
    habit: 'hydration',
    context: { timezone: 'Asia/Seoul' },
  };

  const response = await fetch(`http://127.0.0.1:${port}/ml/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.source, 'api');
  assert.equal(body.model, 'mock-fastapi');
  assert.deepEqual(body.prediction.received, payload);
  assert.equal(body.prediction.recommendedAction, 'drink-water');
});
