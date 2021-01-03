import Field from '@/common/Field';

class Log {
    constructor({timestamp, message}) {
        this.timestamp = timestamp;
        this.message = message;
    }

    static fields() {
        return [
            new Field('timestamp', 'text', false),
            new Field('message', 'text', false)
        ];
    }
}

export default Log;
