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

@Entity({displayName: '바코드 태그 기록'})
export default class DiscountProcessHistory extends BaseEntity {
  @Field({displayName: '식별자', mutable: false, visible: false})
  id: number;

  @Field({displayName: '날짜', mutable: false})
  @TransformDate()
  timestamp: Date;

  @Field({displayName: '유형(Verify | Confirm | Cancel)', mutable: false})
  type: 'Verify' | 'Commit' | 'Cancel' | string;

  @Field({displayName: '학번', mutable: false})
  studentId: string;

  @Field({displayName: '식당 코드', mutable: false})
  cafeteriaId: number;

  @Field({displayName: '식사(4 | 2 | 1)', mutable: false})
  mealType: number;

  @Field({displayName: '결과 코드', mutable: false})
  failedAt: number;

  @Field({displayName: '메시지', mutable: false})
  message: string;
}
