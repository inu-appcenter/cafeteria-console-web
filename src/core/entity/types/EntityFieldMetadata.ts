import {FieldTypeName} from '@/core/entity/types/FieldTypeName';
import {EntityClass} from '@/core/entity/types/EntityClass';

export type EntityFieldMetadata = {
  name: string;
  type: FieldTypeName;
  entityClass?: EntityClass<any>;
  description?: string;
  visible: boolean;
  mutable: boolean;
  validate: (value: any) => boolean | string;
};
