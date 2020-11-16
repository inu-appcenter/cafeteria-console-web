import Repository from '@/data/Repository';
import Corner from '@/pages/home/features/cafeteria/entities/Corner';

class CornerRepository extends Repository {

    async getAllCorners() {
        const query = `
            query GetAllCorners {
                allCorners {
                    id
                    name
                    display_name
                    available_at
                    cafeteria_id
                }
            }
        `;

        const result = await this._doRequest(query);

        const rawAllCorners = result['allCorners'];

        return rawAllCorners.map((raw) => new Corner(raw));
    }

}

const cornerRepository = new CornerRepository();

export default cornerRepository;
