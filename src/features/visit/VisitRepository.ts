import http from '@/core/request/http';
import config from '../../../config';
import VisitRecord from '@/features/visit/VisitRecord';

class VisitRepository {
  async leaveVisitRecord({studentId, phoneNumber, cafeteriaId}: VisitRecord) {
    await http.post(config.api.endpoints.visit, {
      studentId,
      phoneNumber,
      cafeteriaId,
    });
  }
}

export default new VisitRepository();
