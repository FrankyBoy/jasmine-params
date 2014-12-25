exports.createDescription = function (description, items, definitions) {
    items.forEach(function (element, index) {
        description = description.replace('#' + definitions[index], element);
    });

    return description;
};


exports.valuesOf = function (object) {
    var values = [];
    for (var key in object) {
        values.push(object[key]);
    }
    return values;
};
