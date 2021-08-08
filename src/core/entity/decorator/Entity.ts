import MetadataStorage from '@/core/metadata/MetadataStorage';
import {EntityClassMetadata} from '@/core/entity/types/EntityClassMetadata';

export default function Entity(options?: Partial<EntityClassMetadata>): ClassDecorator {
  return target => {
    const metadataValue: EntityClassMetadata = {
      name: options?.name || target.name,
    };

    MetadataStorage.defineEntityMetadata(target, metadataValue);
  };
}
