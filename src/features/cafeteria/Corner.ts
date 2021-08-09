import validation from '@/common/validation';
import BaseEntity from '@/core/entity/BaseEntity';
import Entity from '@/core/entity/decorator/Entity';
import Field from '@/core/entity/decorator/Field';

@Entity({displayName: '코너'})
export default class Corner extends BaseEntity {
  @Field({validate: validation.stringNotEmpty})
  name: string;

  @Field({validate: validation.stringNotEmpty})
  displayName: string;

  @Field({validate: validation.numberNonNegative})
  availableAt: number;

  @Field({validate: validation.numberOverZero})
  cafeteriaId: number;
}
