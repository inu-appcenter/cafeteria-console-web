export default {
  withBoolProps(obj, props) {
    for (const prop of props) {
      obj[prop] = false;
    }

    return obj;
  },
};
