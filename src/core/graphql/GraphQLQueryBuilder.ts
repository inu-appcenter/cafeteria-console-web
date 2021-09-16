import BaseEntity from '@/core/entity/BaseEntity';
import {EntityClass} from '@/core/entity/types/EntityClass';
import {GraphQLQuery} from '@/core/graphql/GraphQLQuery';
import {EntityFieldMetadata} from '@/core/entity/types/EntityFieldMetadata';

export type FindQueryOptions = {
  order?: 'ASC' | 'DESC' | string;
  offset?: number;
  limit?: number;
};

export default class GraphQLQueryBuilder<T extends BaseEntity> {
  constructor(private readonly entityClass: EntityClass<T>) {}

  private meta = this.entityClass.metadata();

  private name = this.meta.name;
  private fields = this.meta.fields;

  find(options?: FindQueryOptions): GraphQLQuery {
    const queryName = `all${this.name}`;

    const fields = this.fields.map(f => this.buildFieldRecursively(f, 1));
    const body = [`${queryName}(order: $order, offset: $offset, limit: $limit) {`, ...fields, '}']
      .map(l => '\t' + l)
      .join('\n');

    return {
      queryName,
      query: `query ${queryName}($order: String, $offset: Int, $limit: Int) {\n${body}\n}`,
      variables: {
        order: options?.order,
        offset: options?.offset,
        limit: options?.limit,
      },
    };
  }

  save(entity: T): GraphQLQuery {
    const queryName = `save${this.name}`;

    return {
      queryName,
      query: `
        mutation ${queryName}($values: ${this.name}Input) {
          ${queryName}(values: $values)
        }
      `,
      variables: {
        values: this.ownDefinedFieldsOnly(entity),
      },
    };
  }

  remove(entity: T): GraphQLQuery {
    const queryName = `remove${this.name}`;

    return {
      queryName,
      query: `
        mutation ${queryName}($id: Int) {
          ${queryName}(id: $id)
        }
      `,
      variables: {
        id: entity['id'],
      },
    };
  }

  private buildFieldRecursively(f: EntityFieldMetadata, depth = 0) {
    if (f.entityClass) {
      const fields = f.entityClass.metadata().fields.map(f => this.buildFieldRecursively(f, depth + 1));

      return [`${f.name} {`, ...fields, '\t'.repeat(depth) + '}'].map(l => '\t'.repeat(depth) + l).join('\n');
    } else {
      return `\t`.repeat(depth) + f.name;
    }
  }

  /**
   * 관계 칼럼이 아닌 직접 소유한 칼럼이고, 그 값이 undefined가 아닌 것들만 가져옵니다.
   */
  private ownDefinedFieldsOnly(entity: T) {
    const result: Record<string, unknown> = {};

    const fields = this.meta.fields;

    for (const field of fields) {
      if (field.entityClass) {
        // 엔티티 클래스가 있는 필드는 관계 필드이므로 패쓰!
        continue;
      }

      if (entity[field.name] === undefined) {
        // 설정되지 않은 필드는 서버쪽의 기본값을 사용하도록 패쓰!
        continue;
      }

      result[field.name] = entity[field.name];
    }

    return result;
  }
}
