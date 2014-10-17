var gpm = require('get-parameter-names');
var _ = require('lodash');

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
    
    this.values = function () {
        valuesOf(arguments).forEach(function (element, index) {
            if (Array.isArray(element))
                self.clauses[index] = element;
            else
                self.clauses[index] = [element];
        });
        
        return self;
    };
    
    this.parameterize = function (jasminefunc, description, functionUnderTest) {
        var needsDone = (gpm(functionUnderTest)[0] === 'done');
        
        self.clauses.forEach(function (element, index) {
            
            var newDescription = createDescription(description, element, self.definitions);
            
            if (needsDone) {
                return jasminefunc(newDescription, function (done) {
                    element.unshift(done);
                    functionUnderTest.apply(this, element);
                });
            } else {
                return jasminefunc(newDescription, function () {
                    functionUnderTest.apply(this, element);
                });
            }
        });
    };
    
    this.it = _.partial(this.parameterize, it);
    this.xit = _.partial(this.parameterize, xit);
    this.iit = _.partial(this.parameterize, iit);
    
    this.describe = _.partial(this.parameterize, describe);
    this.ddescribe = _.partial(this.parameterize, ddescribe);
    this.xdescribe = _.partial(this.parameterize, xdescribe);
};

exports.iterate = function() {
    return new jparams(arguments);
};

