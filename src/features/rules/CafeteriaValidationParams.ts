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
import {number, numberOverZero, stringNotEmpty, timeRangeString} from '@/core/component/common/validation';

@Entity({displayName: '할인 검증 파라미터'})
export default class CafeteriaValidationParams extends BaseEntity {
  @Field({displayName: '식별자', visible: false, mutable: false})
  id: number;

  @Field({displayName: '연관된 카페테리아의 식별자', validate: numberOverZero})
  cafeteriaId: number;

  @Field({displayName: '요청 검증에 사용하는 토큰', validate: stringNotEmpty})
  token: string;

  @Field({displayName: '할인 이용 가능한 시간대', validate: availableMealTypeShouldBeValid})
  availableMealTypes: number;

  @Field({displayName: '아침 식사 시간대', validate: timeRangeString})
  breakfast: string;

  @Field({displayName: '점심 식사 시간대', validate: timeRangeString})
  lunch: string;

  @Field({displayName: '저녁 식사 시간대', validate: timeRangeString})
  dinner: string;
}

function availableMealTypeShouldBeValid(mealType) {
  return (number(mealType) && mealType >= 0 && mealType <= 7) || 'From 0 to 7.';
}
