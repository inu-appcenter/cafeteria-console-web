function exists(value: any) {
  return value !== undefined && value !== null;
}

function isNumber(value: any) {
  return typeof value === 'number' && !isNaN(value);
}

function isString(value: any) {
  return typeof value === 'string';
}

export default {
  required(value: any) {
    return exists(value) || 'Required.';
  },

  stringNotEmpty(value: any) {
    return (exists(value) && isString(value) && value.length > 0) || 'Should not be empty.';
  },

  number(value: any) {
    return exists(value) && isNumber(value);
  },

  numberOverZero(value: any) {
    return (exists(value) && isNumber(value) && value > 0) || 'Should be over zero';
  },

  numberNonNegative(value: any) {
    return (exists(value) && isNumber(value) && value >= 0) || 'Should be over zero';
  },
};
