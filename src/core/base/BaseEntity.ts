import {FieldMetadata, getFields} from '@/core/decorator/Field';
import {getEntityMeta} from '@/core/decorator/Entity';

export type ObjectType<T> = {
  new (): T;
};

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]> | T[P];
};

export type EntityClass = ObjectType<BaseEntity>;
export type EntityClassWithStaticMethods = {new (): BaseEntity} /*생성자*/ & typeof BaseEntity /*정적메소드*/;
export type EntityMetadata = {
  name: string;
  fields: FieldMetadata[];
};

/**
 * TypeORM의 그것을 모조!
 */
export default class BaseEntity {
  static metadata<T extends BaseEntity>(this: ObjectType<T>): EntityMetadata {
    return {
      name: getEntityMeta(this).name,
      fields: getFields(this),
    };
  }

  static create<T extends BaseEntity>(this: ObjectType<T>, entityLike: DeepPartial<T>): T {
    return Object.assign(new this(), entityLike);
  }

  static async find<T extends BaseEntity>(this: ObjectType<T>): Promise<T[]> {
    return [{} as T];
  }

  async save(): Promise<this> {
    return this;
  }

  async remove(): Promise<this> {
    return this;
  }
}
