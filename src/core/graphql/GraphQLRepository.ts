import config from '../../../config';
import {GraphQLQuery} from '@/core/graphql/GraphQLQuery';
import http from '@/core/request/http';

class GraphQLRepository {
  private endpoint = config.api.endpoints.graphql;

  async query(params: GraphQLQuery): Promise<any[]> {
    return (await this.execute(params)) as any[];
  }

  async mutate(params: GraphQLQuery): Promise<number> {
    return (await this.execute(params)) as number;
  }

  private async execute(params: GraphQLQuery): Promise<any[] | number> {
    const response = await this.getResponse(params);

    if (!response.ok) {
      throw new Error(`알 수 없는 에러가 발생하였습니다. 상태 코드: ${response.status}`);
    }

    const json = await response.json();

    return json.data[params.queryName];
  }

  private async getResponse({query, variables}: GraphQLQuery) {
    try {
      const result = await http.post(this.endpoint, {
        query,
        variables,
      });

      const {errors} = await result.clone().json();

      if (errors != null) {
        throw new Error(`서버가 요청을 처리하였으나 오류를 돌려주었습니다: ${JSON.stringify(errors)}`);
      }

      return result;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}

export default new GraphQLRepository();
