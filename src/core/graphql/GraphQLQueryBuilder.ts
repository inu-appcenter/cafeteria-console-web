import {EntityClass} from '@/core/entity/types/EntityClass';
import {GraphQLQuery} from '@/core/graphql/GraphQLQuery';
import BaseEntity from '@/core/entity/BaseEntity';
import {onlyFields} from '@/core/common/object';

export default class GraphQLQueryBuilder<T extends BaseEntity> {
  constructor(private readonly entityClass: EntityClass<T>) {}

  private meta = this.entityClass.metadata();

  find(): GraphQLQuery {
    const queryName = `all${this.meta.name}`;

    return {
      queryName,
      query: `
        query ${queryName}{
          ${queryName} {
            ${this.meta.fields.map(f => f.name)}
          }
        }
    `,
    };
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
        [`${this.meta.name}Id`]: entity.id,
      },
    };
  }
}
