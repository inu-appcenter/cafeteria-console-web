import MetadataStorage from '@/core/metadata/MetadataStorage';
import {EntityClassMetadata} from '@/core/entity/types/EntityClassMetadata';

export default function Entity(options?: Partial<EntityClassMetadata>): ClassDecorator {
  return target => {
    const name = options?.name ?? target.name;

    const metadataValue: EntityClassMetadata = {
      name,
      displayName: options?.displayName ?? name,
      description: options?.description,
    };

    MetadataStorage.defineEntityMetadata(target, metadataValue);
  };
}
