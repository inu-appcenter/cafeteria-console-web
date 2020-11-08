import GenericItem from '@/pages/home/features/cafeteria/entity/GenericItem';
import Field from '@/pages/home/features/cafeteria/Field';

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
            new Field('id', 'number', false),
            new Field('name', 'text', true),
            new Field('display_name', 'text', true),
            new Field('available_at', 'number', true),
            new Field('cafeteria_id', 'number', true)
        ];
    }
}

export default Corner;
