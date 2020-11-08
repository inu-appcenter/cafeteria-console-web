import GenericItem from '@/pages/home/features/cafeteria/entity/GenericItem';

class Cafeteria extends GenericItem {
    constructor({id = null, name = null, display_name = null, support_menu = false, support_discount = false, support_notification = false}) {
        super({});

        this.id = id;
        this.name = name;
        this.display_name = display_name;
        this.support_menu = support_menu;
        this.support_discount = support_discount;
        this.support_notification = support_notification;
    }
}

export default Cafeteria;
