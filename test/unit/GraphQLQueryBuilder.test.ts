import GraphQLQueryBuilder from '@/core/graphql/GraphQLQueryBuilder';
import Cafeteria from '@/features/cafeteria/Cafeteria';

describe('그래프 QL 쿼리 빌더', () => {
  it('중첩 쿼리도 잘 짜주나!?', async () => {
    const query = new GraphQLQueryBuilder(Cafeteria).find();

    console.log(query.query);
  });
});
