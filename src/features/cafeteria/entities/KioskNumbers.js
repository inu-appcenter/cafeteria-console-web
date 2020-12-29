import GenericItem from '@/common/GenericItem';
import Field from '@/common/Field';
import validation from '@/common/validation';

class KioskNumbers extends GenericItem {
    constructor({kiosk_numbers, cafeteria_id = null}) {
        super({});

        this.cafeteria_id = cafeteria_id;
        this.kiosk_numbers = kiosk_numbers;
    }

    static fields() {
        return [
            new Field('cafeteria_id', 'number', true, validation.numberOverZero),
            new Field('kiosk_numbers', 'text', true, validation.stringNotEmpty)
        ];
    }
}

export default KioskNumbers;
