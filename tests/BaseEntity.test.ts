import BaseEntity from '@/core/base/BaseEntity';
import Field, {getFields} from '@/core/decorator/Field';
import Entity, {getEntityMeta} from '@/core/decorator/Entity';

@Entity({name: '사실난Person이아니다'})
class Person extends BaseEntity {
  @Field({name: '사실난이름이없다', type: 'string'})
  name: string;

  @Field({type: 'int'})
  age: number;
}

describe('메타데이터 빼오기!', () => {
  it('엔티티 되나!?', async () => {
    console.log(getEntityMeta(Person));
  });

  it('필드 되나!?', async () => {
    console.log(getFields(Person));
  });

  it('엔티티 통째로 되나?????!?!?!?', async () => {
    console.log(Person.metadata());
  });
});
