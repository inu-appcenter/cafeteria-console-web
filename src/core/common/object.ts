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

import {OnlyFields} from '@/core/common/types';

/**
 * 오브젝트에서 함수를 제외한 필드만 남긴 새로운 오브젝트를 만들어 반환합니다.
 *
 * @param source 원본 오브젝트.
 */
export function onlyFields<T>(source: T): OnlyFields<T> {
  const result: any = {};

  Object.assign(result, source);

  for (const key of Object.keys(source)) {
    if (typeof source[key] === 'function') {
      delete result[key];
    }
  }

  return result;
}
