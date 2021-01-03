import Field from '@/common/Field';

class TransactionHistory {
    constructor({id = null, type = null, user_id = null, cafeteria_id = null, meal_type = null, failed_at = null, message = null, timestamp = null}) {
        this.id = id;
        this.type = type;
        this.user_id = user_id;
        this.cafeteria_id = cafeteria_id;
        this.meal_type = meal_type;
        this.failed_at = failed_at;
        this.message = message;
        this.timestamp = timestamp;
    }

    static fields() {
        return [
            new Field('id', 'number', false),
            new Field('type', 'text', false),
            new Field('user_id', 'number', false),
            new Field('cafeteria_id', 'number', false),
            new Field('meal_type', 'number', false),
            new Field('failed_at', 'number', false),
            new Field('message', 'text', false),
            new Field('timestamp', 'text', false),
        ];
    }
}

export default TransactionHistory;
