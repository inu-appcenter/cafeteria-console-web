class GenericItem {
    constructor({editing=false, modified=false, loading=false}) {
        this.editing = editing;
        this.modified = modified;
        this.loading = loading;
    }
}

export default GenericItem;
