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
import {numberOverZero} from '@/core/component/common/validation';
import VisitRepository from '@/features/visit/VisitRepository';

@Entity({displayName: '방문 기록'})
export default class VisitRecord extends BaseEntity {
  @Field({displayName: '학번'})
  studentId?: string;

  @Field({displayName: '휴대전화 번호'})
  phoneNumber?: string;

  @Field({visible: false, displayName: '방문한 학식당의 식별자', validate: numberOverZero})
  cafeteriaId: number = 1;

  async save(): Promise<this> {
    // 여기서는 GraphQL을 통해 직접 엔티티 저장 요청을 보내지 않고,
    // 별도의 API를 사용하도록 유도합니다.
    await VisitRepository.leaveVisitRecord(this);
    return this;
  }
}
