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

import Cafeteria from '@/features/cafeteria/Cafeteria';
import {plainToClass} from 'class-transformer';
import fetch from 'node-fetch';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.fetch = fetch;

describe('카페테리아 엔티티 통째로 서버에서 들고오자!', () => {
  it('될까!?', async () => {
    console.log(Cafeteria.metadata());
  });

  it('클래스 트랜스포머 작동시켜보기', async () => {
    const fromApi = JSON.parse(`[
    {
        "id": 5,
        "name": "2호관식당",
        "corners": [
          {
            "id": 17,
            "name": "중식",
            "availableAt": 2,
            "cafeteria": null
          },
          {
            "id": 18,
            "name": "석식",
            "availableAt": 1,
            "cafeteria": null
          }
        ]
      }
    ]`);

    const parsed = plainToClass(Cafeteria, fromApi, {excludeExtraneousValues: true});

    console.log(parsed[0].corners);
  });

  it('요청 실제로 날려보기', async () => {
    console.log(await Cafeteria.find());
  });
});
