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

import Field from '@/core/entity/decorator/Field';
import Entity from '@/core/entity/decorator/Entity';
import BaseEntity from '@/core/entity/BaseEntity';
import TransformDate from '@/core/entity/decorator/TransformDate';

@Entity({displayName: '서버 로그'})
export default class Log extends BaseEntity {
  @Field({displayName: '날짜'})
  @TransformDate()
  timestamp: Date;

  @Field({displayName: '메시지'})
  message: string;
}
