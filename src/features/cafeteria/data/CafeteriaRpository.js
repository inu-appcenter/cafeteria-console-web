import GenericRepository from '@/common/GenericRepository';
import Cafeteria from '@/features/cafeteria/entities/Cafeteria';

class CafeteriaRepository extends GenericRepository {

    async getAllCafeteria() {
        return this.query('GetAllCafeteria', 'allCafeteria', Cafeteria);
    }

    async addCafeteria(cafeteria) {
        return this.mutate('AddCafeteria', 'createCafeteria', [
            {
                name: 'cafeteria',
                type: 'CafeteriaInput',
                value: cafeteria.filter(Cafeteria.fields().map((f) => f.name)),
            }
        ]);
    }

    async updateCafeteria(cafeteria) {
        return this.mutate('UpdateCafeteria', 'updateCafeteria', [
            {
                name: 'cafeteria',
                type: 'CafeteriaInput',
                value: cafeteria.filter(Cafeteria.fields().map((f) => f.name)),
            }
        ]);
    }

    async deleteCafeteria(cafeteria) {
        return this.mutate('DeleteCafeteria', 'deleteCafeteria', [
            {
                name: 'cafeteriaId',
                type: 'Int',
                value: cafeteria.id,
            }
        ]);
    }
}

const cafeteriaRepository = new CafeteriaRepository();

export default cafeteriaRepository;
