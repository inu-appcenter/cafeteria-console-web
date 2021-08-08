import MetadataStorage from '@/core/metadata/MetadataStorage';
import {toEntityFieldType} from '@/core/entity/types/FieldType';
import {EntityFieldMetadata} from '@/core/entity/types/EntityFieldMetadata';

export default function Field(options?: Partial<EntityFieldMetadata>): PropertyDecorator {
  return (target, key) => {
    const metadataValue: EntityFieldMetadata = {
      name: options?.name ?? key.toString(),
      type: options?.type ?? toEntityFieldType(MetadataStorage.getTypeOfSymbol(target, key).name),
      description: options?.description,
      visible: options?.visible ?? true,
      mutable: options?.mutable ?? true,
    };

    // Property 데코레이터의 경우 target이 생성자가 아닙니다.
    // 그래도 우리는 생성자에다가 메타데이터를 맞춰줘야 합니다.
    MetadataStorage.defineFieldMetadata(target.constructor, metadataValue);
  };
}
