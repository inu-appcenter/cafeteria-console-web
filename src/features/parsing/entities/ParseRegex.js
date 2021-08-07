import GenericItem from '@/common/GenericItem';
import validation from '@/common/validation';
import Field from '@/common/Field';

class ParseRegex extends GenericItem {
  constructor({id = null, regex = null}) {
    super({});

    this.id = id;
    this.regex = regex;
  }

  static fields() {
    return [
      new Field('id', 'number', false, true, validation.numberOverZero),
      new Field('regex', 'text', true, true, validation.stringNotEmpty),
    ];
  }
}

export default ParseRegex;
