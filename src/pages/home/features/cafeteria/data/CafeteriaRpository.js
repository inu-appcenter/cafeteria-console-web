import Repository from '@/data/Repository';
import Cafeteria from '@/pages/home/features/cafeteria/entities/Cafeteria';

class CafeteriaRepository extends Repository {

    async getAllCafeteria() {
        const query = `
            query GetAllCafeteria {
                allCafeteria {
                    id
                    name
                    display_name
                    support_menu
                    support_discount
                    support_notification
                }
            }            
        `;

        const result = await this._doRequest(query);

        const rawAllCafeteria = result['allCafeteria'];

        return rawAllCafeteria.map((raw) => new Cafeteria(raw));
    }

    async addCafeteria(cafeteria) {
        const query = `
            mutation AddCafeteria($cafeteria: CafeteriaInput) {
                createCafeteria(cafeteria: $cafeteria)
            }
        `;

        const variables = {
            cafeteria: cafeteria.filter(Cafeteria.fields().map((f) => f.name))
        };

        const result = await this._doRequest(query, variables);

        return this._decodeMutationResult(result);
    }

    async updateCafeteria(cafeteria) {
        const query = `
            mutation UpdateCafeteria($cafeteria: CafeteriaInput) {
                updateCafeteria(cafeteria: $cafeteria)
            }
        `;

        const variables = {
            cafeteria: cafeteria.filter(Cafeteria.fields().map((f) => f.name))
        };

        const result = await this._doRequest(query, variables);

        return this._decodeMutationResult(result);
    }

    async deleteCafeteria(cafeteria) {
        const query = `
            mutation DeleteCafeteria($cafeteriaId: Int) {
                deleteCafeteria(cafeteriaId: $cafeteriaId)
            }
        `;

        const variables = {
            cafeteriaId: cafeteria.id
        };

        const result = await this._doRequest(query, variables);

        return this._decodeMutationResult(result);
    }
}

const cafeteriaRepository = new CafeteriaRepository();

export default cafeteriaRepository;
