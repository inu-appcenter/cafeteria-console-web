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

import BaseEntity from '@/core/entity/BaseEntity';
import Entity from '@/core/entity/decorator/Entity';
import Field from '@/core/entity/decorator/Field';
import TransformDate from '@/core/entity/decorator/TransformDate';
import {stringNotEmpty} from '@/core/component/common/validation';

@Entity()
export default class Answer extends BaseEntity {
  @Field({visible: false, mutable: false})
  id: number;

  @Field({visible: false, mutable: false})
  questionId: number;

  @Field({displayName: '제목', validate: stringNotEmpty})
  title: string;

  @Field({displayName: '내용', validate: stringNotEmpty, type: 'text'})
  body: string;

  @Field({mutable: false, visible: false})
  @TransformDate()
  answeredAt: Date;

  @Field({mutable: false, visible: false})
  read: boolean;

  @Field({mutable: false, visible: false})
  @TransformDate()
  readAt: Date;
}
