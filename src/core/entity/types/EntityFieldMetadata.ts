import {FieldTypeName} from '@/core/entity/types/FieldTypeName';
import {EntityClass} from '@/core/entity/types/EntityClass';

export type EntityFieldMetadata = {
  name: string;
  displayName?: string;
  description?: string;

  type: FieldTypeName;
  entityClass?: EntityClass<any>;
  visible: boolean;
  mutable: boolean;
  validate: (value: any) => boolean | string;
};
