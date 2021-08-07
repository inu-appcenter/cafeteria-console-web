class GenericItem {
  constructor({editing = false, modified = false, loading = false, valid = false}) {
    this.editing = editing;
    this.modified = modified;
    this.loading = loading;
    this.valid = valid;
  }

  filter(allowedFields) {
    const copied = Object.assign({}, this);

    for (const field in this) {
      if (!Object.hasOwnProperty.call(copied, field)) {
        continue;
      }

      if (allowedFields.indexOf(field) > -1) {
        continue;
      }

      delete copied[field];
    }

    return copied;
  }
}

export default GenericItem;
