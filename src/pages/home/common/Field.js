class Field {
    constructor(name, type, mutable, validate=function(){return true;}) {
        this.name = name;
        this.type = type;
        this.mutable = mutable;
        this.validate = validate;
    }
}

export default Field;
