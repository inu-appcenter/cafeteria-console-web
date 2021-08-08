import {EntityClassMetadata} from '@/core/entity/types/EntityClassMetadata';
import {EntityFieldMetadata} from '@/core/entity/types/EntityFieldMetadata';

export type EntityMetadata = EntityClassMetadata & {
  fields: EntityFieldMetadata[];
};
