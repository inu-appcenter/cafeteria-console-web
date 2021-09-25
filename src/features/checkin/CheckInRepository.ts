import config from '../../../config';
import Context from '@/features/checkin/Context';
import http from '@/core/request/http';

class CheckInRepository {
  async fetchContext(cafeteriaId: number): Promise<Context> {
    const result = await http.get(config.api.endpoints.checkInContext(cafeteriaId));

    const {capacity, expected, actual, total} = await result.json();

    return Context.of({capacity, expected, actual, total});
  }

  async checkIn(ticket: string, gracefulInTime: boolean) {
    await http.post(config.api.endpoints.checkIn, {ticket, gracefulInTime});
  }
}

export default new CheckInRepository();
