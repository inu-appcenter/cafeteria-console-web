import GenericItem from '@/common/GenericItem';
import Field from '@/common/Field';
import validation from '@/common/validation';

class Answer extends GenericItem {
  constructor({id = null, title, body, read, date}) {
    super({});

    this.id = id;
    this.title = title;
    this.body = body;
    this.read = read;
    this.date = date;
  }

  static fields() {
    return [
      new Field('id', 'number', false, false),
      new Field('title', 'text', true, true, validation.stringNotEmpty),
      new Field('body', 'text', true, true, validation.stringNotEmpty),
      new Field('date', 'text', false, true),
      new Field('read', 'bool', false, true),
    ];
  }
}

export default Answer;
