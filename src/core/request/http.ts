/**
 * This file is part of INU Cafeteria.
 *
 * Copyright 2022 INU Global App Center <potados99@gmail.com>
 *
 * INU Cafeteria is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * INU Cafeteria is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import HttpError from '@/core/request/HttpError';

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
      headers: {
        'content-type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(body),
    }),
  );
}

async function assertOk(responsePromise: Promise<Response>): Promise<Response> {
  const response = await responsePromise;

  if (!response.ok) {
    const body = await response.clone().json();

    console.error(body);

    throw new HttpError(body.error, body.message);
  }

  return response;
}

export default {
  get,
  post,
};
