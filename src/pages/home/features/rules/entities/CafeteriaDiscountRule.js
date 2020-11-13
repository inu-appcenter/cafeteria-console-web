import GenericItem from '@/pages/home/common/GenericItem';
import Field from '@/pages/home/common/Field';

class CafeteriaDiscountRule extends GenericItem {
    constructor({id=null, name, description, enabled}) {
        super({});

        this.id = id; /* Rule id. No additional table for 'DiscountRule', because it will have no columns other than id. */
        this.name = name;
        this.description = description;
        this.enabled = enabled;
    }

    static fields() {
        return [
            new Field('id', 'number', false),
            new Field('name', 'text', false),
            new Field('description', 'text', false),
            new Field('enabled', 'bool', true),
        ];
    }
}

export default CafeteriaDiscountRule;
