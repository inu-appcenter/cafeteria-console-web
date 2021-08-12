import 'reflect-metadata';

import {ObjectType} from '@/core/common/types';

type HavingName = {
  name: string;
};

/**
 * reflect-metadata가 관리하는 메타데이터 저장소의 wrapper!
 */
export default class MetadataStorage {
  /**
   * 클래스의 필드에다가 메타데이터 달아버림!
   * @param clazz 그 클래스의 생성자!
   * @param metadataValue 달아버릴 메타데이터!
   */
  static defineFieldMetadata<EntityT, FieldMetaT extends HavingName>(
    clazz: ObjectType<EntityT>,
    metadataValue: FieldMetaT,
  ) {
    const fields = (Reflect.getOwnMetadata('potados:fields', clazz) as FieldMetaT[]) || [];

    if (fields.find(f => f.name === metadataValue.name) == null) {
      fields.push(metadataValue);
    }

    Reflect.defineMetadata('potados:fields', fields, clazz);
  }

  /**
   * 클래스의 필드들에 달아버린 메타데이터 다 가져옴!
   * @param clazz 필드 메타데이터를 가져올 그 클래스의 생성자!
   */
  static getFieldMetadata<EntityT, FieldMetaT extends HavingName>(clazz: ObjectType<EntityT>): FieldMetaT[] {
    const allFields: FieldMetaT[] = [];
    let target = clazz;

    while (target != Object.prototype) {
      const fieldsOfTarget = (Reflect.getOwnMetadata('potados:fields', target) as FieldMetaT[]) || [];

      for (const existing of fieldsOfTarget) {
        if (allFields.find(f => f.name === existing.name)) {
          // 자식 클래스의 필드 정의가 부모 클래스의 정의를 오버라이드합니다.
          continue;
        }

        allFields.push(existing);
      }

      target = Object.getPrototypeOf(target);
    }

    return allFields;
  }

  /**
   * 클래스에다가 메타데이터 달아버림!
   * @param clazz 그 클래스의 생성자!
   * @param metadataValue 달아버릴 메타데이터!
   */
  static defineEntityMetadata<EntityT, EntityMetaT>(clazz: ObjectType<EntityT>, metadataValue: EntityMetaT) {
    Reflect.defineMetadata('potados:entity', metadataValue, clazz);
  }

  /**
   * 클래스에 달린 메타데이터 가져옴!
   * @param clazz 그 클래스의 생성자!
   */
  static getEntityMetadata<EntityT, EntityMetaT>(clazz: ObjectType<EntityT>): EntityMetaT {
    return Reflect.getOwnMetadata('potados:entity', clazz);
  }

  /**
   * 클래스 필드의 타입을 가져옴!
   * @param target 타겟! 아마 클래스 인스턴스?
   * @param propertyKey 필드 이름!
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  static getTypeOfSymbol(target: Object, propertyKey: string | symbol): Function {
    return Reflect.getMetadata('design:type', target, propertyKey);
  }
}
