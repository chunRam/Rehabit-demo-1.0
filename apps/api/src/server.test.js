import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { createServer } from './server.js';

const listen = (server) =>
  new Promise((resolve) => {
    server.listen(0, () => {
      resolve(server.address().port);
    });
  });

const close = (server) =>
  new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) reject(err);
      else resolve();
    });
  });

const request = (port, path) =>
  new Promise((resolve, reject) => {
    http
      .get({ hostname: '127.0.0.1', port, path }, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve({ status: res.statusCode, body: data });
        });
      })
      .on('error', reject);
  });

test('health check returns ok', async () => {
  const server = createServer();
  const port = await listen(server);
  const response = await request(port, '/healthz');
  assert.equal(response.status, 200);
  assert.deepEqual(JSON.parse(response.body), { status: 'ok' });
  await close(server);
});

test('unknown routes return 404', async () => {
  const server = createServer();
  const port = await listen(server);
  const response = await request(port, '/missing');
  assert.equal(response.status, 404);
  assert.deepEqual(JSON.parse(response.body), { message: 'Not Found' });
  await close(server);
});
