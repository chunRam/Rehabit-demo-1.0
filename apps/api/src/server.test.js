import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { createServer } from './server.js';

const postJson = (port, path, payload) =>
  new Promise((resolve, reject) => {
    const request = http.request(
      {
        hostname: '127.0.0.1',
        port,
        path,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve({ status: res.statusCode, body: data });
        });
      },
    );

    request.on('error', reject);
    request.end(JSON.stringify(payload));
  });

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

test('predict endpoint returns 503 when ML service URL missing', async () => {
  const server = createServer({ mlServiceUrl: undefined });
  const port = await listen(server);
  const response = await postJson(port, '/ml/predict', { habit: 'hydrate' });
  assert.equal(response.status, 503);
  assert.deepEqual(JSON.parse(response.body), { message: 'ML service unavailable' });
  await close(server);
});

test('predict endpoint validates JSON body', async () => {
  const server = createServer({ mlServiceUrl: 'http://127.0.0.1:5999' });
  const port = await listen(server);

  const invalidBody = await new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: '127.0.0.1',
        port,
        path: '/ml/predict',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => resolve({ status: res.statusCode, body: data }));
      },
    );

    req.on('error', reject);
    req.end('{ this is not valid json');
  });

  assert.equal(invalidBody.status, 400);
  assert.deepEqual(JSON.parse(invalidBody.body), { message: 'Request body must be valid JSON' });
  await close(server);
});
