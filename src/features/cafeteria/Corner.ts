import BaseEntity from '@/core/entity/BaseEntity';
import Entity from '@/core/entity/decorator/Entity';
import Field from '@/core/entity/decorator/Field';
import {numberNonNegative, numberOverZero, stringNotEmpty} from '@/core/component/common/validation';

@Entity({displayName: '코너'})
export default class Corner extends BaseEntity {
  @Field({displayName: '식별자', validate: numberOverZero})
  id: number;

  @Field({validate: stringNotEmpty})
  name: string;

  @Field({validate: stringNotEmpty})
  displayName: string;

  @Field({validate: numberNonNegative})
  availableAt: number;

  @Field({validate: numberOverZero})
  cafeteriaId: number;
}
