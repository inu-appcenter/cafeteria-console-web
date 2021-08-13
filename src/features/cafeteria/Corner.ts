import BaseEntity from '@/core/entity/BaseEntity';
import Entity from '@/core/entity/decorator/Entity';
import Field from '@/core/entity/decorator/Field';
import validation from '@/core/component/common/validation';

@Entity({displayName: '코너'})
export default class Corner extends BaseEntity {
  @Field({displayName: '식별자', validate: validation.numberOverZero})
  id: number;

  @Field({validate: validation.stringNotEmpty})
  name: string;

  @Field({validate: validation.stringNotEmpty})
  displayName: string;

  @Field({validate: validation.numberNonNegative})
  availableAt: number;

  @Field({validate: validation.numberOverZero})
  cafeteriaId: number;
}
