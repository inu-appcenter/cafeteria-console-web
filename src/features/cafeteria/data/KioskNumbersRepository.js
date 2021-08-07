import GenericRepository from '@/common/GenericRepository';
import KioskNumbers from '@/features/cafeteria/entities/KioskNumbers';

class KioskNumbersRepository extends GenericRepository {
  async getAllKioskNumbers() {
    return this.query('GetAllKioskParams', 'allCafeteriaKioskNumbers', KioskNumbers);
  }

  async addKioskNumbers(kioskNumbers) {
    return this.mutate('AddCafeteriaKioskNumbers', 'createCafeteriaKioskNumbers', [
      {
        name: 'kioskNumbers',
        type: 'CafeteriaKioskNumbersInput',
        value: kioskNumbers.filter(KioskNumbers.fields().map(f => f.name)),
      },
    ]);
  }

  async updateKioskNumbers(kioskNumbers) {
    return this.mutate('UpdateCafeteriaKioskNumbers', 'updateCafeteriaKioskNumbers', [
      {
        name: 'kioskNumbers',
        type: 'CafeteriaKioskNumbersInput',
        value: kioskNumbers.filter(KioskNumbers.fields().map(f => f.name)),
      },
    ]);
  }

  async deleteKioskNumbers(kioskNumbers) {
    return this.mutate('DeleteCafeteriaKioskNumbers', 'deleteCafeteriaKioskNumbers', [
      {
        name: 'cafeteriaId',
        type: 'Int',
        value: kioskNumbers.cafeteria_id,
      },
    ]);
  }
}

const kioskNumbersRepository = new KioskNumbersRepository();

export default kioskNumbersRepository;
