import GenericItem from '@/common/GenericItem';
import Field from '@/common/Field';
import validation from '@/common/validation';

class Comment extends GenericItem {
  constructor({comment, cafeteria_id = null}) {
    super({});

    this.cafeteria_id = cafeteria_id;
    this.comment = comment;
  }

  static fields() {
    return [
      new Field('cafeteria_id', 'number', false, true, validation.numberOverZero),
      new Field('comment', 'bigtext', true, true, validation.stringNotEmpty),
    ];
  }
}

export default Comment;
