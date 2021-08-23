import BaseEntity from '@/core/entity/BaseEntity';
import Entity from '@/core/entity/decorator/Entity';
import Field from '@/core/entity/decorator/Field';
import {numberOverZero} from '@/core/component/common/validation';

@Entity({displayName: '휴업 일정'})
export default class CafeteriaDayOff extends BaseEntity {
  @Field({displayName: '식별자', visible: false, mutable: false})
  id: number;

  @Field({displayName: '식당의 식별자', validate: numberOverZero})
  cafeteriaId: number;

  @Field({displayName: '휴업 시작 시간'})
  startsAt: Date;

  @Field({displayName: '휴업 종료 시간'})
  endsAt: Date;
}
