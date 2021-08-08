import Field from '@/core/entity/decorator/Field';
import Entity from '@/core/entity/decorator/Entity';
import BaseEntity from '@/core/entity/BaseEntity';
import fetch from 'node-fetch';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.fetch = fetch;

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

@Entity()
class Cafeteria extends BaseEntity {
  @Field()
  name: string;

  @Field()
  displayName: string;

  @Field()
  comment?: string;

  @Field()
  supportMenu: boolean;

  @Field()
  supportDiscount: boolean;

  @Field()
  supportNotification: boolean;
}

describe('쿼리해오기', () => {
  it('되나!!!!!!?', async () => {
    console.log(Cafeteria.metadata());
    console.log(await Cafeteria.find());
  });
});
