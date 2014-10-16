var gpm = require('get-parameter-names');

var createDescription = function(description, items, definitions) {
    items.forEach(function(element, index) {
        description = description.replace('#' + definitions[index], element);
    });

    return description;
};

var valuesOf = function(object) {

    var values = [];

    for (var key in object) {
        values.push(object[key]);
    }

    return values;
};


var jparams = function (args) {
    var self = this;
    this.definitions = args;
    this.clauses = [];
    
    this.for = function () {
        valuesOf(arguments).forEach(function (element, index) {
            if (Array.isArray(element))
                self.clauses[index] = element;
            else
                self.clauses[index] = [element];
        });
        
        return self;
    };
    
    this.do = function (description, functionUnderTest) {
        var needsDone = (gpm(functionUnderTest)[0] === 'done');
        
        self.clauses.forEach(function (element, index) {
            
            var newDescription = createDescription(description, element, self.definitions);
            
            if (needsDone) {
                return it(newDescription, function (done) {
                    element.unshift(done);
                    functionUnderTest.apply(this, element);
                });
            } else {
                return it(newDescription, function () {
                    functionUnderTest.apply(this, element);
                });
            }
        });
    };
};

exports.iterate = function() {
    return new jparams(arguments);
};

