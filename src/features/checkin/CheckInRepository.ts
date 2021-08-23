import config from '../../../config';
import Context from '@/features/checkin/Context';
import http from '@/core/request/http';

class CheckInRepository {
  async fetchContext(): Promise<Context> {
    //     return Context.of({capacity: 20, expected: 18, actual: 16, total: 30});

    const result = await http.get(config.api.endpoints.checkInContext);

    const {capacity, expected, actual, total} = await result.json();

    return Context.of({capacity, expected, actual, total});
  }

  async checkIn(ticket: string) {
    await http.post(config.api.endpoints.checkIn, {ticket});
  }
}

export default new CheckInRepository();
