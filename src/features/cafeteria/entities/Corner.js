import GenericItem from '@/common/GenericItem';
import Field from '@/common/Field';
import validation from '@/common/validation';

class Corner extends GenericItem {
    constructor({id = null, name = null, display_name = null, available_at = null, cafeteria_id = null}) {
        super({});

        this.id = id;
        this.name = name;
        this.display_name = display_name;
        this.available_at = available_at;
        this.cafeteria_id = cafeteria_id;
    }

    static fields() {
        return [
            new Field('id', 'number', false, validation.numberOverZero),
            new Field('name', 'text', true, validation.stringNotEmpty),
            new Field('display_name', 'text', true, validation.stringNotEmpty),
            new Field('available_at', 'number', true, validation.numberNonNegative),
            new Field('cafeteria_id', 'number', true, validation.numberOverZero)
        ];
    }
}

export default Corner;
