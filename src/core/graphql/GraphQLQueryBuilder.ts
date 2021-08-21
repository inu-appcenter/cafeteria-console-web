import {EntityClass} from '@/core/entity/types/EntityClass';
import {GraphQLQuery} from '@/core/graphql/GraphQLQuery';
import BaseEntity from '@/core/entity/BaseEntity';
import {onlyFields} from '@/core/common/object';
import {EntityFieldMetadata} from '@/core/entity/types/EntityFieldMetadata';

export default class GraphQLQueryBuilder<T extends BaseEntity> {
  constructor(private readonly entityClass: EntityClass<T>) {}

  private meta = this.entityClass.metadata();

  find(): GraphQLQuery {
    const queryName = `all${this.meta.name}`;

    const fields = this.meta.fields.map(f => this.buildFieldRecursively(f, 1));
    const body = [`${queryName} {`, ...fields, '}'].map(l => '\t' + l).join('\n');

    return {
      queryName,
      query: `query ${queryName} {\n${body}\n}`,
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

  save(entity: T): GraphQLQuery {
    const queryName = `save${this.meta.name}`;

    return {
      queryName,
      query: `
        mutation ${queryName}($${this.meta.name.toLowerCase()}: ${this.meta.name}Input) {
          ${queryName}(${this.meta.name.toLowerCase()}: $${this.meta.name.toLowerCase()})
        }
      `,
      variables: {
        [`${this.meta.name.toLowerCase()}`]: onlyFields(entity),
      },
    };
  }

  remove(entity: T): GraphQLQuery {
    const queryName = `remove${this.meta.name}`;

    return {
      queryName,
      query: `
        mutation ${queryName}($${this.meta.name}Id) {
          ${queryName}(${this.meta.name}Id: $${this.meta.name}Id)
        }
      `,
      variables: {
        [`${this.meta.name}Id`]: entity['id'],
      },
    };
  }
}
