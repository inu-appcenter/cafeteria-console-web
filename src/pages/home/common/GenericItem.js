class GenericItem {
    constructor({editing=false, modified=false, loading=false, valid=false}) {
        this.editing = editing;
        this.modified = modified;
        this.loading = loading;
        this.valid = valid;
    }
}

export default GenericItem;
