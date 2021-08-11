import Field from '@/core/entity/decorator/Field';
import Entity from '@/core/entity/decorator/Entity';
import BaseEntity from '@/core/entity/BaseEntity';

@Entity({name: 'Human'})
class Person extends BaseEntity {
  @Field({name: 'identifier', type: 'string'})
  name: string;

  @Field({type: 'int'})
  age: number;

  @Field({visible: false})
  birth: Date;
}

describe('메타데이터 빼오기!', () => {
  it('되나?????!?!?!?', async () => {
    console.log(Person.metadata());
  });
});
