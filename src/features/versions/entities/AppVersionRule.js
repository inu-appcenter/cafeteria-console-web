import GenericItem from '@/common/GenericItem';
import Field from '@/common/Field';
import validation from '@/common/validation';

class AppVersionRule extends GenericItem {
    constructor({id=null, os, required_minimum_version}) {
        super({});

        this.id = id;
        this.os = os;
        this.required_minimum_version = required_minimum_version;
    }

    static fields() {
        return [
            new Field('id', 'number', false, false),
            new Field('os', 'text', true, true, validation.stringNotEmpty),
            new Field('required_minimum_version', 'text', true, true, validation.stringNotEmpty),
        ];
    }
}

export default AppVersionRule;
