import http from 'node:http';
import { performance } from 'node:perf_hooks';
import { createObservability } from './observability.js';

const jsonResponse = (res, statusCode, payload) => {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
};

const readRequestBody = (req) =>
  new Promise((resolve, reject) => {
    let data = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });

export function createServer(options = {}) {
  const {
    mlServiceUrl = process.env.ML_SERVICE_URL,
    observability = createObservability({ serviceName: 'rehabit-api' }),
  } = options;

  return http.createServer(async (req, res) => {
    if (req.method === 'GET' && req.url === '/healthz') {
      jsonResponse(res, 200, { status: 'ok' });
      return;
    }

    if (req.method === 'POST' && req.url === '/ml/predict') {
      if (!mlServiceUrl) {
        jsonResponse(res, 503, { message: 'ML service unavailable' });
        return;
      }

      let rawBody = '';
      try {
        rawBody = await readRequestBody(req);
      } catch (error) {
        observability.captureException(error);
        jsonResponse(res, 400, { message: 'Invalid request body stream' });
        return;
      }

      let payload;
      try {
        payload = rawBody ? JSON.parse(rawBody) : {};
      } catch (error) {
        observability.captureException(error);
        jsonResponse(res, 400, { message: 'Request body must be valid JSON' });
        return;
      }

      const startedAt = performance.now();
      try {
        const response = await fetch(`${mlServiceUrl.replace(/\/$/, '')}/predict`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const duration = performance.now() - startedAt;
        observability.recordPerformance('ml.predict', duration, {
          status: response.status,
        });

        const responseBody = await response.json();
        jsonResponse(res, response.status, {
          source: 'api',
          ...responseBody,
        });
      } catch (error) {
        observability.captureException(error, { context: 'ml.predict' });
        jsonResponse(res, 502, { message: 'Failed to reach ML service' });
      }
      return;
    }

    jsonResponse(res, 404, { message: 'Not Found' });
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const server = createServer();
  const port = process.env.API_PORT || 4000;
  server.listen(port, () => {
    console.log(`API server listening on http://localhost:${port}`);
  });
}
