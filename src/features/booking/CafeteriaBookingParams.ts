import BaseEntity from '@/core/entity/BaseEntity';
import Entity from '@/core/entity/decorator/Entity';
import Field from '@/core/entity/decorator/Field';
import {numberOverZero, timeRangeString} from '@/core/component/common/validation';

@Entity({displayName: '예약 옵션'})
export default class CafeteriaBookingParams extends BaseEntity {
  @Field({displayName: '식별자', visible: false, mutable: false})
  id: number;

  @Field({displayName: '연관된 식당의 식별자', validate: numberOverZero})
  cafeteriaId: number;

  @Field({displayName: '수용 가능 인원', validate: numberOverZero})
  capacity: number;

  @Field({displayName: '예약을 받는 시간대', validate: timeRangeString})
  acceptTimeRange: string;

  @Field({displayName: '예약 시간대의 간격(분)', validate: numberOverZero})
  intervalMinutes: number;

  @Field({displayName: '입장 후 식당에 머무르는 기간(분)', validate: numberOverZero})
  durationMinutes: number;

  @Field({displayName: '입장 시간 전후 허용 오차(분)', validate: numberOverZero})
  toleranceMinutes: number;
}
