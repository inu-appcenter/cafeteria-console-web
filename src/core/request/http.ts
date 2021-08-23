async function get(path: string, headers?: Record<string, any>): Promise<Response> {
  return await assertOk(
    fetch(path, {
      method: 'get',
      headers,
      credentials: 'include',
    }),
  );
}

async function post(path: string, body: Record<string, any>, headers?: Record<string, any>): Promise<Response> {
  return await assertOk(
    fetch(path, {
      method: 'post',
      credentials: 'include',
      headers,
      body: JSON.stringify(body),
    }),
  );
}

async function assertOk(responsePromise: Promise<Response>): Promise<Response> {
  const response = await responsePromise;

  if (!response.ok) {
    const body = await response.json();

    throw new Error(body.message);
  }

  return response;
}

export default {
  get,
  post,
};
