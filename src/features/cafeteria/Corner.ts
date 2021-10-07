import Field from '@/core/entity/decorator/Field';
import Entity from '@/core/entity/decorator/Entity';
import BaseEntity from '@/core/entity/BaseEntity';
import {numberNonNegative, numberOverZero, stringNotEmpty} from '@/core/component/common/validation';

@Entity({displayName: '코너'})
export default class Corner extends BaseEntity {
  @Field({displayName: '식별자', validate: numberOverZero})
  id: number;

  @Field({displayName: '코너 이름', validate: stringNotEmpty})
  name: string;

  @Field({displayName: '코너 표시 이름', validate: stringNotEmpty})
  displayName: string;

  @Field({displayName: '이용 가능 시간(4|2|1)', validate: numberNonNegative})
  availableAt: number;

  @Field({displayName: '속한 식당의 식별자', validate: numberOverZero})
  cafeteriaId: number;
}
