import GenericRepository from '@/common/GenericRepository';
import ParseRegex from '@/features/parsing/entities/ParseRegex';

class ParseRegexRepository extends GenericRepository {
  async getAllParesRegexes() {
    return await this.query('GetAllParseRegexes', 'allParseRegexes', ParseRegex);
  }

  async addParseRegex(parseRegex) {
    return this.mutate('AddParseRegex', 'createParseRegex', [
      {
        name: 'regex',
        type: 'ParseRegexInput',
        value: parseRegex.filter(ParseRegex.fields().map(f => f.name)),
      },
    ]);
  }

  async updateParseRegex(parseRegex) {
    return this.mutate('UpdateParseRegex', 'updateParseRegex', [
      {
        name: 'regex',
        type: 'ParseRegexInput',
        value: parseRegex.filter(ParseRegex.fields().map(f => f.name)),
      },
    ]);
  }

  async deleteParseRegex(parseRegex) {
    return this.mutate('DeleteParseRegex', 'deleteParseRegex', [
      {
        name: 'regexId',
        type: 'Int',
        value: parseRegex.id,
      },
    ]);
  }
}

const parseRegexRepository = new ParseRegexRepository();

export default parseRegexRepository;
