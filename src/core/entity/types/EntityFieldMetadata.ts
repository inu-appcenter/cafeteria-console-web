import {FieldType} from '@/core/entity/types/FieldType';

export type EntityFieldMetadata = {
  name: string;
  type: FieldType;
  description?: string;
  visible: boolean;
  mutable: boolean;
  validate: (value: any) => boolean;
};
