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
import User from '@/features/questions/User';
import Answer from '@/features/questions/Answer';
import Field from '@/core/entity/decorator/Field';
import Entity from '@/core/entity/decorator/Entity';
import TransformDate from '@/core/entity/decorator/TransformDate';

@Entity({displayName: '1:1 사용자 문의'})
export default class Question extends BaseEntity {
  @Field({mutable: false, visible: false})
  id: number;

  @Field({displayName: '기기 정보', mutable: false})
  deviceInfo: string;

  @Field({displayName: '앱 버전', mutable: false})
  appVersion: string;

  @Field({visible: false, mutable: false})
  content: string;

  @Field({mutable: false, visible: false, entityClass: User})
  user: User;

  @Field({mutable: false, visible: false})
  @TransformDate()
  askedAt: Date;

  @Field({mutable: true, visible: false, entityClass: Answer})
  answer?: Answer;
}
