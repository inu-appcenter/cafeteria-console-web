function exists(value) {
    return value !== undefined && value !== null;
}

function isNumber(value) {
    return typeof(value) === 'number';
}

function isString(value) {
    return typeof(value) === 'string'
}

export default {
    required(value) {
        return exists(value) || 'Required.';
    },

    stringNotEmpty(value) {
        return (exists(value) && isString(value) && value.length > 0) || 'Should not be empty.';
    },

    number(value) {
        return exists(value) && isNumber(value);
    },

    numberOverZero(value) {
        return (exists(value) && isNumber(value) && value > 0) || 'Should be over zero';
    }
}
