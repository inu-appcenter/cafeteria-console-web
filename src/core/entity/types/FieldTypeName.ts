import {ConstructorType} from '@/core/common/types';

export type DefaultTypeName = 'boolean' | 'int' | 'string' | 'text' | 'date' | 'array';
export type FieldTypeName = DefaultTypeName | string;

type DefaultTypeAndName<T> = {
  constructor: ConstructorType<T>;
  name: DefaultTypeName;
};

const defaultTypeMappings: DefaultTypeAndName<unknown>[] = [
  {
    constructor: Boolean,
    name: 'boolean',
  },
  {
    constructor: Number,
    name: 'int',
  },
  {
    constructor: String,
    name: 'string',
  },
  {
    constructor: Date,
    name: 'date',
  },
  {
    constructor: Array,
    name: 'array',
  },
];

export function isDefaultType(typeFunction: any): boolean {
  return defaultTypeMappings.map(t => t.constructor).includes(typeFunction);
}

export function defaultTypeNameOf(typeFunction: any): DefaultTypeName | undefined {
  const type = defaultTypeMappings.find(t => t.constructor === typeFunction);

  return type?.name;
}
