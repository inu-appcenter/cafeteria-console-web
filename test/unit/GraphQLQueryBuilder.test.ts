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

import GraphQLQueryBuilder from '@/core/graphql/GraphQLQueryBuilder';
import Cafeteria from '@/features/cafeteria/Cafeteria';

describe('그래프 QL 쿼리 빌더', () => {
  it('중첩 쿼리도 잘 짜주나!?', async () => {
    const query = new GraphQLQueryBuilder(Cafeteria).find();

    console.log(query.query);
  });
});
