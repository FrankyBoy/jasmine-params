

var createDescription = function (description, items, definitions) {

    var newDescription = description;
    

    items.forEach(function (element, index) {
        newDescription = newDescription.replace('#'+definitions[index], element);
    });

    return newDescription;
};

var valuesOf = function (object) {

    var values = [];

    for (var key in object) {
        values.push(object[key]);
    }

    return values;
};


var jparams = function(args) {
    var self = this;
    this.definitions = args;
    this.clauses = [];

    this.where = function() {
        valuesOf(arguments).forEach(function(element, index) {
            if (Array.isArray(element))
                self.clauses[index] = element;
            else
                self.clauses[index] = [element];
        });

        return self;
    };

    this.loop = function(description, functionUnderTest) {

        self.clauses.forEach(function(element, index) {
            return it(createDescription(description, element, self.definitions), function() {

                //TODO : Check for the existence of the "done" parameter
                functionUnderTest.apply(this, element);
            });
        });
    };

}

exports.iterate = function () {
    return new jparams(arguments);
};

