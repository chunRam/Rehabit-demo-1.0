const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000';

async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    const message = error?.message || 'API error';
    throw new Error(message);
  }
  return response.json();
}

export async function apiGet(path) {
  const response = await fetch(`${API_URL}${path}`);
  return handleResponse(response);
}

export async function apiPost(path, body) {
  const response = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  return handleResponse(response);
}

export async function apiPatch(path, body) {
  const response = await fetch(`${API_URL}${path}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  return handleResponse(response);
}

export async function apiDelete(path) {
  const response = await fetch(`${API_URL}${path}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.message || 'API error');
  }
  return true;
}
