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
import {numberOverZero, timeRangeString} from '@/core/component/common/validation';

@Entity({displayName: '예약 시간대 설정'})
export default class BookingTimeRange extends BaseEntity {
  @Field({displayName: '식별자', visible: false, mutable: false})
  id: number;

  @Field({displayName: '예약을 받는 시간대', validate: timeRangeString})
  timeRange: string;

  @Field({displayName: '예약 시간대의 간격(분)', validate: numberOverZero})
  intervalMinutes: number;

  @Field({displayName: '수용 가능 인원', validate: numberOverZero})
  capacity: number;

  @Field({displayName: '속한 예약 옵션의 식별자', validate: numberOverZero})
  cafeteriaBookingParamsId: number;
}
