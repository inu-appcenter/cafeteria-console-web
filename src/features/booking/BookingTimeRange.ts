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
