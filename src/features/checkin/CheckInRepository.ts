import config from '../../../config';
import Context from '@/features/checkin/Context';

class CheckInRepository {
  async fetchContext(): Promise<Context> {
    const result = await fetch(config.api.endpoints.checkInContext, {
      credentials: 'include',
    });

    //     return Context.of({capacity: 20, expected: 18, actual: 16, total: 30});

    const {capacity, expected, actual, total} = await result.json();

    return Context.of({capacity, expected, actual, total});
  }

  async checkIn(ticket: string) {
    const result = await fetch(config.api.endpoints.checkIn, {
      method: 'POST',
      credentials: 'include',
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      body: new URLSearchParams({ticket}).toString(),
    });

    if (!result.ok) {
      const body = result.json();

      throw new Error(body['message'] || '알 수 없는 이유로 요청에 실패했습니다.');
    }
  }
}

export default new CheckInRepository();
