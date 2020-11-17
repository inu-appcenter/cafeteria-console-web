import GenericRepository from '@/data/GenericRepository';
import ParseRegex from '@/pages/home/features/parsing/entities/ParseRegex';

class ParseRegexRepository extends GenericRepository {

    async getAllParesRegexes() {
        const result = await this.query('GetAllParseRegexes', 'allParseRegexes', ParseRegex);
        console.log(result);
        return result;
    }

    async addParseRegex(parseRegex) {
        return this.mutate('AddParseRegex', 'createParseRegex', [
            {
                name: 'regex',
                type: 'ParseRegexInput',
                value: parseRegex.filter(ParseRegex.fields().map((f) => f.name))
            }
        ]);
    }

    async updateParseRegex(parseRegex) {
        return this.mutate('UpdateParseRegex', 'updateParseRegex', [
            {
                name: 'regex',
                type: 'ParseRegexInput',
                value: parseRegex.filter(ParseRegex.fields().map((f) => f.name))
            }
        ]);
    }

    async deleteParseRegex(parseRegex) {
        return this.mutate('DeleteParseRegex', 'deleteParseRegex', [
            {
                name: 'regexId',
                type: 'Int',
                value: parseRegex.id
            }
        ]);
    }
}

const parseRegexRepository = new ParseRegexRepository();

export default parseRegexRepository;
