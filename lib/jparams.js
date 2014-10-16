var definitions = 0;
var clauses = [];

var jparams = this.jparams = jparams || {};

jparams.iterate = function() {

    clauses = [];
    definitions = arguments;

    return {

        where: function() {

            valuesOf(arguments).forEach(function(element, index) {
                if(Array.isArray(element))
                    clauses[index] = element;
                else
                    clauses[index] = [element];
            });

        }
    };
};

var valuesOf = function(object) {

    var values = [];

    for (var key in object) {
        values.push(object[key]);
    }

    return values;
};

var createDescription = function(description, items) {

    var newDescription = description;

    items.forEach(function(element, index) {
        newDescription = newDescription.replace('#'+definitions[index], element);
    });

    return newDescription;
};

jparams.loop = function(description, functionUnderTest) {

    clauses.forEach(function(element, index) {

        return it(createDescription(description, element), function(done) {

            //TODO : Check for the existence of the "done" parameter, at the start, before injecting the done
            // type - for now just assume everything needs it.

            element.unshift(done);
            functionUnderTest.apply(this, element);
        });
    });
};
