/**
 * This file is part of INU Cafeteria.
 *
 * Copyright 2022 INU Global App Center <potados99@gmail.com>
 *
 * INU Cafeteria is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * INU Cafeteria is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import MetadataStorage from '@/core/metadata/MetadataStorage';
import {defaultTypeNameOf} from '@/core/entity/types/FieldTypeName';
import {EntityFieldMetadata} from '@/core/entity/types/EntityFieldMetadata';
import {Expose, Type} from 'class-transformer';

export default function Field(options?: Partial<EntityFieldMetadata>): PropertyDecorator {
  return (target, key) => {
    const typeFunction = MetadataStorage.getTypeOfSymbol(target, key);

    // 기본 타입이라면 별도로 지정하지 않아도 DefaultTypeName을 유추할 수 있습니다.
    // 만약 유추 불가능이라면 주어진 타입(아마도 클래스)의 이름을 그대로 씁니다.
    const typeName = defaultTypeNameOf(typeFunction) ?? typeFunction.name;

    const metadataValue: EntityFieldMetadata = {
      name: options?.name ?? key.toString(),
      displayName: options?.displayName,
      description: options?.description,

      type: options?.type ?? typeName,
      entityClass: options?.entityClass,
      visible: options?.visible ?? true,
      mutable: options?.mutable ?? true,
      validate:
        options?.validate ??
        function () {
          return true;
        },
    };

    // Property 데코레이터의 경우 target이 생성자가 아닙니다.
    // 그래도 우리는 생성자에다가 메타데이터를 맞춰줘야 합니다.
    MetadataStorage.defineFieldMetadata(target.constructor, metadataValue);

    // class-transformer와 같이 사용할 거예요.
    const ec = options?.entityClass;
    if (ec) {
      Type(() => ec)(target, key);
    }

    Expose()(target, key);
  };
}
