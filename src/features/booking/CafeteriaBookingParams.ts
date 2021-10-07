import Field from '@/core/entity/decorator/Field';
import Entity from '@/core/entity/decorator/Entity';
import BaseEntity from '@/core/entity/BaseEntity';
import {numberOverZero} from '@/core/component/common/validation';

@Entity({displayName: '예약 옵션'})
export default class CafeteriaBookingParams extends BaseEntity {
  @Field({displayName: '식별자', visible: true, mutable: false})
  id: number;

  @Field({displayName: '연관된 식당의 식별자', validate: numberOverZero})
  cafeteriaId: number;

  @Field({displayName: '입장 후 식당에 머무르는 기간(분)', validate: numberOverZero})
  userStaysForMinutes: number;
}
