import GenericRepository from '@/data/GenericRepository';
import Corner from '@/pages/home/features/cafeteria/entities/Corner';

class CornerRepository extends GenericRepository {

    async getAllCorners() {
        return this.query('GetAllCorners', 'allCorners', Corner);
    }

    async addCorner(corner) {
        return this.mutate('AddCorner', 'createCorner', [
            {
                name: 'corner',
                type: 'CornerInput',
                value: corner.filter(Corner.fields().map((f) => f.name)),
            }
        ]);
    }

    async updateCorner(corner) {
        return this.mutate('UpdateCorner', 'updateCorner', [
            {
                name: 'corner',
                type: 'CornerInput',
                value: corner.filter(Corner.fields().map((f) => f.name)),
            }
        ]);
    }

    async deleteCorner(corner) {
        return this.mutate('DeleteCorner', 'deleteCorner', [
            {
                name: 'cornerId',
                type: 'Int',
                value: corner.id,
            }
        ]);
    }
}

const cornerRepository = new CornerRepository();

export default cornerRepository;
