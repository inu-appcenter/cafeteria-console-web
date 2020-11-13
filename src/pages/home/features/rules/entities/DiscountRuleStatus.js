import GenericItem from '@/pages/home/common/GenericItem';
import Field from '@/pages/home/common/Field';

class DiscountRuleStatus extends GenericItem {
    constructor({id=null, enabled}) {
        super({});

        this.id = id; /* Rule id. No additional table for 'DiscountRule', because it will have no columns other than id. */
        this.enabled = enabled;
    }

    static fields() {
        return [
            new Field('id', 'number', false),
            new Field('enabled', 'bool', true),
        ];
    }
}

export default DiscountRuleStatus;
