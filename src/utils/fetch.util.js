import fetchnode from 'node-fetch';

async function request(url, method, options) {
  return fetchnode(url, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Secret: 'xxx',
    },
    body: options ? JSON.stringify({
      ...options
    }) : {},
  });
}

export default {
  post: (url, options) => request(url, 'POST', options),
  get: (url, options) => request(url, 'GET', options),
  put: (url, options) => request(url, 'PUT', options),
  delete: (url, options) => request(url, 'DELETE', options),
};