import {EntityMetadata} from '@/core/entity/types/EntityMetadata';
import MetadataStorage from '@/core/metadata/MetadataStorage';
import {EntityClassMetadata} from '@/core/entity/types/EntityClassMetadata';
import {EntityFieldMetadata} from '@/core/entity/types/EntityFieldMetadata';
import {DeepPartial} from '@/core/common/types';
import Field from '@/core/entity/decorator/Field';
import GraphQLQueryBuilder from '@/core/graphql/GraphQLQueryBuilder';
import {EntityClass} from '@/core/entity/types/EntityClass';
import GraphQLRepository from '@/core/graphql/GraphQLRepository';
import Editable from '@/core/entity/Editable';
import validation from '@/common/validation';

/**
 * TypeORM의 그것을 모조!
 */
export default class BaseEntity extends Editable {
  @Field({description: '식별자입니다.', validate: validation.numberOverZero})
  id: number;

  static metadata<T extends BaseEntity>(this: EntityClass<T>): EntityMetadata {
    return {
      ...MetadataStorage.getEntityMetadata<T, EntityClassMetadata>(this),
      fields: MetadataStorage.getFieldMetadata<T, EntityFieldMetadata>(this),
    };
  }

  static create<T extends BaseEntity>(this: EntityClass<T>, entityLike: DeepPartial<T>): T {
    return Object.assign(new this(), entityLike);
  }

  static async find<T extends BaseEntity>(this: EntityClass<T>): Promise<T[]> {
    const query = new GraphQLQueryBuilder(this).find();

    const result = await GraphQLRepository.query(query);

    return result.map(r => this.create(r));
  }

  async save(): Promise<this> {
    return this;
  }

  async remove(): Promise<this> {
    return this;
  }
}
