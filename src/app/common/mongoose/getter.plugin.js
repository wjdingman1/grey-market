module.exports.getterPlugin = (schema) => {
    schema.set('toObject', { getters: true });
    schema.set('toJSON', { getters: true });
};

module.exports.parseDecimal = (value) => {
    if (typeof value !== 'undefined') {
        return parseFloat(value.toString());
    }
    return value;
};
