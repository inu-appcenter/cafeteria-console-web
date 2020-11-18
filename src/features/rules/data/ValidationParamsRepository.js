import GenericRepository from '@/common/GenericRepository';
import CafeteriaValidationParams from '@/features/rules/entities/CafeteriaValidationParams';

class ValidationParamsRepository extends GenericRepository {

    async getAllValidationParams() {
        return this.query('GetAllValidationParams', 'allValidationParams', CafeteriaValidationParams);
    }

    async addValidationParams(params) {
        return this.mutate('AddValidationParams', 'createValidationParams', [
            {
                name: 'params',
                type: 'CafeteriaValidationParamsInput',
                value: params.filter(CafeteriaValidationParams.fields().map((f) => f.name))
            }
        ]);
    }

    async updateValidationParams(params) {
        return this.mutate('UpdateValidationParams', 'updateValidationParams', [
            {
                name: 'params',
                type: 'CafeteriaValidationParamsInput',
                value: params.filter(CafeteriaValidationParams.fields().map((f) => f.name))
            }
        ]);
    }

    async deleteValidationParams(params) {
        return this.mutate('DeleteValidationParams', 'deleteValidationParams', [
            {
                name: 'cafeteriaId',
                type: 'Int',
                value: params.cafeteria_id
            }
        ]);
    }
}

const validationParamsRepository = new ValidationParamsRepository();

export default validationParamsRepository;
