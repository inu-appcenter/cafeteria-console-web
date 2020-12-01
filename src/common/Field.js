class Field {
    constructor(name, type, mutable, visible=true, validate=function(){return true;}) {
        this.name = name;
        this.displayName = name;
        this.type = type;
        this.mutable = mutable;
        this.visible = visible;
        this.validate = validate;
    }

    apply(action) {
        action(this);
        return this;
    }
}

export default Field;
