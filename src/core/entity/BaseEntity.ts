import {EntityMetadata} from '@/core/entity/types/EntityMetadata';
import MetadataStorage from '@/core/metadata/MetadataStorage';
import {EntityClassMetadata} from '@/core/entity/types/EntityClassMetadata';
import {EntityFieldMetadata} from '@/core/entity/types/EntityFieldMetadata';
import {ConstructorType, DeepPartial} from '@/core/common/types';

/**
 * TypeORM의 그것을 모조!
 */
export default class BaseEntity {
  static metadata<T extends BaseEntity>(this: ConstructorType<T>): EntityMetadata {
    return {
      ...MetadataStorage.getEntityMetadata<T, EntityClassMetadata>(this),
      fields: MetadataStorage.getFieldMetadata<T, EntityFieldMetadata>(this),
    };
  }

  static create<T extends BaseEntity>(this: ConstructorType<T>, entityLike: DeepPartial<T>): T {
    return Object.assign(new this(), entityLike);
  }

  static async find<T extends BaseEntity>(this: ConstructorType<T>): Promise<T[]> {
    return [{} as T];
  }

  async save(): Promise<this> {
    return this;
  }

  async remove(): Promise<this> {
    return this;
  }
}
