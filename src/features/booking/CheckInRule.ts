import Entity from '@/core/entity/decorator/Entity';
import BaseEntity from '@/core/entity/BaseEntity';
import Field from '@/core/entity/decorator/Field';

@Entity({displayName: '체크인 검증 규칙'})
export default class CheckInRule extends BaseEntity {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  enabled: boolean;
}
