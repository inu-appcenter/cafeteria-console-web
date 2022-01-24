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

import Entity from '@/core/entity/decorator/Entity';
import BaseEntity from '@/core/entity/BaseEntity';
import Field from '@/core/entity/decorator/Field';
import Corner from '@/features/cafeteria/Corner';
import {numberOverZero, stringNotEmpty} from '@/core/component/common/validation';

@Entity({displayName: '카페테리아'})
export default class Cafeteria extends BaseEntity {
  @Field({displayName: '식별자', validate: numberOverZero})
  id: number;

  @Field({displayName: '식당 이름', validate: stringNotEmpty})
  name: string = '';

  @Field({displayName: '앱에서 표시될 이름', validate: stringNotEmpty})
  displayName: string = '';

  @Field({displayName: '식당 안내', type: 'text'})
  comment?: string;

  @Field({displayName: '메뉴 정보 제공 여부'})
  supportMenu: boolean = false;

  @Field({displayName: '예약 지원 여부'})
  supportBooking: boolean = false;

  @Field({displayName: '할인 제공 여부'})
  supportDiscount: boolean = false;

  @Field({displayName: '알림 지원 여부'})
  supportNotification: boolean = false;

  // 안 쓰지만 그냥 넣어봄 ㅎㅎ
  @Field({displayName: '코너', visible: false, mutable: false, entityClass: Corner})
  corners: Corner[];
}
