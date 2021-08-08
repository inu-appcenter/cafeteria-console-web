import {EntityClass} from '@/core/base/BaseEntity';
import {FieldMetadata} from '@/core/decorator/Field';

export type EntityMetadata = {
  name: string;
};

export type EntityMetadataInit = {
  name?: string;
};

export default function Entity(options?: EntityMetadataInit): ClassDecorator {
  return target => {
    const meta: EntityMetadata = {
      name: options?.name || target.name,
    };

    Reflect.defineMetadata('entity', meta, target);
  };
}

export function getEntityMeta(entityClass: EntityClass): EntityMetadata {
  return Reflect.getOwnMetadata('entity', entityClass);
}
