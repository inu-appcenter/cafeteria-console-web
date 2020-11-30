class Field {
    constructor(name, type, mutable, visible=true, validate=function(){return true;}) {
        this.name = name;
        this.type = type;
        this.mutable = mutable;
        this.visible = visible;
        this.validate = validate;
    }
}

export default Field;
