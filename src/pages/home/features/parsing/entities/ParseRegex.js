import GenericItem from '@/pages/home/common/GenericItem';
import validation from '@/pages/home/common/validation';
import Field from '@/pages/home/common/Field';

class ParseRegex extends GenericItem {
    constructor({id = null, regex = null}) {
        super({});

        this.id = id;
        this.regex = regex;
    }

    static fields() {
        return [
            new Field('id', 'number', validation.numberOverZero),
            new Field('regex', 'text', validation.stringNotEmpty)
        ];
    }
}

export default ParseRegex;
