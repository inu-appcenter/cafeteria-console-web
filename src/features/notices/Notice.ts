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

@Entity({displayName: '공지'})
export default class Notice extends BaseEntity {
  @Field({displayName: '식별자', mutable: false})
  id: number;

  @Field({displayName: '제목', validate: stringNotEmpty})
  title: string;

  @Field({type: 'text', displayName: '내용', validate: stringNotEmpty})
  body: string;

  @Field({displayName: '타겟 운영체제', validate: stringNotEmpty})
  targetOs: string;

  @Field({displayName: '타겟 앱 버전(semver)', validate: stringNotEmpty})
  targetVersion: string;

  @Field({displayName: '생성 일시', mutable: false})
  @TransformDate()
  createdAt: Date;

  @Field({displayName: '업데이트 일시', mutable: false})
  @TransformDate()
  updatedAt: Date;
}
