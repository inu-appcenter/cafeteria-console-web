import BaseEntity from '@/core/entity/BaseEntity';
import Entity from '@/core/entity/decorator/Entity';
import Field from '@/core/entity/decorator/Field';

@Entity({displayName: '할인 적용 규칙'})
export default class DiscountRule extends BaseEntity {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  enabled: boolean;
}
