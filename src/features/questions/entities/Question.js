import Field from '@/common/Field';
import GenericItem from '@/common/GenericItem';

class Question extends GenericItem {
    constructor({id=null, device_info, version, content, user_id, date, answer}) {
        super({});

        this.id = id;
        this.device_info = device_info;
        this.version = version;
        this.content = content;
        this.user_id = user_id;
        this.date = date;
        this.answer = answer;
    }

    static fields() {
        return [
            new Field('id', 'number', false , false),
            new Field('device_info', 'text', false, true),
            new Field('version', 'text', false, true),
            new Field('content', 'text', false, true),
            new Field('user_id', 'number', false, true),
            new Field('date', 'text', false, true),
            new Field('answer', 'Answer', false, true),
        ];
    }
}

export default Question;
