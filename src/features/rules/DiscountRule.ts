import BaseEntity from '@/core/entity/BaseEntity';
import Entity from '@/core/entity/decorator/Entity';
import Field from '@/core/entity/decorator/Field';

@Entity()
export default class DiscountRule extends BaseEntity {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  enabled: boolean;
}
