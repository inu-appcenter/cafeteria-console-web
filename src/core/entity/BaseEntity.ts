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

import {EntityMetadata} from '@/core/entity/types/EntityMetadata';
import MetadataStorage from '@/core/metadata/MetadataStorage';
import {EntityClassMetadata} from '@/core/entity/types/EntityClassMetadata';
import {EntityFieldMetadata} from '@/core/entity/types/EntityFieldMetadata';
import {DeepPartial} from '@/core/common/types';
import {EntityClass} from '@/core/entity/types/EntityClass';
import GraphQLRepository from '@/core/graphql/GraphQLRepository';
import Editable from '@/core/entity/Editable';
import {plainToClass} from 'class-transformer';
import GraphQLQueryBuilder, {FindQueryOptions} from '@/core/graphql/GraphQLQueryBuilder';

/**
 * TypeORM의 그것을 모조!
 */
export default class BaseEntity extends Editable {
  static metadata<T extends BaseEntity>(this: EntityClass<T>): EntityMetadata {
    return {
      ...MetadataStorage.getEntityMetadata<T, EntityClassMetadata>(this),
      fields: MetadataStorage.getFieldMetadata<T, EntityFieldMetadata>(this),
    };
  }

  static create<T extends BaseEntity>(this: EntityClass<T>, entityLike: DeepPartial<T>): T {
    return Object.assign(new this(), entityLike);
  }

  static async find<T extends BaseEntity>(this: EntityClass<T>, options?: FindQueryOptions): Promise<T[]> {
    const query = new GraphQLQueryBuilder(this).find(options);

    const result = await GraphQLRepository.query(query);

    console.log(`${this.metadata().name} ${result.length}개 가져왔습니다!`);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return result.map(r => plainToClass(this, r, {excludeExtraneousValues: true}));
  }

  async save(): Promise<this> {
    const mutate = new GraphQLQueryBuilder(this.constructor as EntityClass<this>).save(this);

    const numberOfUpdatedEntities = await GraphQLRepository.mutate(mutate);
    if (numberOfUpdatedEntities === 0) {
      throw new Error('저장 실패!');
    }

    console.log(`저장했습니다!`);

    return this;
  }

  async remove(): Promise<this> {
    const mutate = new GraphQLQueryBuilder(this.constructor as EntityClass<this>).remove(this);

    const numberOfUpdatedEntities = await GraphQLRepository.mutate(mutate);
    if (numberOfUpdatedEntities === 0) {
      throw new Error('삭제 실패!');
    }

    console.log(`삭제했습니다!`);

    return this;
  }
}
