import Field from '@/core/entity/decorator/Field';
import BaseEntity from '@/core/entity/BaseEntity';
import Entity from '@/core/entity/decorator/Entity';

@Entity()
export default class User extends BaseEntity {
  @Field({mutable: false})
  studentId?: string;

  @Field({mutable: false})
  phoneNumber?: string;
}
