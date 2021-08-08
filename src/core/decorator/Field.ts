import 'reflect-metadata';
import {EntityClass} from '@/core/base/BaseEntity';

export type FieldMetadata = {
  name: string;
  type: string;
  description?: string;
  visible: boolean;
  mutable: boolean;
};

type FieldMetadataInit = {
  name?: string;
  type?: string;
  description?: string;
  visible?: boolean;
  mutable?: boolean;
};

export default function Field(options?: FieldMetadataInit): PropertyDecorator {
  return (target, key) => {
    const classConstructor = target.constructor;

    const metadataValue: FieldMetadata = {
      name: options?.name || key.toString(),
      type: options?.type || typeIs(Reflect.getMetadata('design:type', target, key).name),
      description: options?.description,
      visible: options?.visible || true,
      mutable: options?.mutable || true,
    };

    const fields = (Reflect.getOwnMetadata('fields', classConstructor) as FieldMetadata[]) || [];
    if (fields.find(f => f.name === key.toString()) == null) {
      fields.push(metadataValue);
    }

    Reflect.defineMetadata('fields', fields, classConstructor);
  };
}

export function getFields(entityClass: EntityClass) {
  const fields: FieldMetadata[] = [];
  let target = entityClass;
  while (target != Object.prototype) {
    const childFields = (Reflect.getOwnMetadata('fields', target) as FieldMetadata[]) || [];
    fields.push(...childFields);
    target = Object.getPrototypeOf(target);
  }
  return fields;
}

function typeIs(jsConstructorTypeName: string) {
  const conversion = {
    String: 'string',
    Number: 'int', // 기본 추측임!
    Boolean: 'boolean',
    Date: 'date',
  };

  return conversion[jsConstructorTypeName] || jsConstructorTypeName;
}
