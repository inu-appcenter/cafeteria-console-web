import Field from '@/common/Field';
import GenericItem from '@/common/GenericItem';
import validation from '@/common/validation';

class Notice extends GenericItem {
    constructor({id=null, title, body, target_os, target_version}) {
        super({});

        this.id = id;
        this.title = title;
        this.body = body;
        this.target_os = target_os;
        this.target_version = target_version;
    }

    static fields() {
        return [
            new Field('id', 'number', false, false),
            new Field('title', 'text', true, true, validation.stringNotEmpty),
            new Field('body', 'bigtext', true, true, validation.stringNotEmpty),
            new Field('target_os', 'text', true, true, validation.stringNotEmpty),
            new Field('target_version', 'text', true, true, validation.stringNotEmpty),
        ];
    }
}

export default Notice;
