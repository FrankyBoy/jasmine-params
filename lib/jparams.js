var gpm = require('get-parameter-names');
var helpers = require('./helpers.js');


var parameterize = function (jasminefunc, description, functionUnderTest) {
    var needsDone = (gpm(functionUnderTest)[0] === 'done');

    this.clauses.forEach(function(element) {
        var newDescription = helpers.createDescription(description, element, this.definitions);

        if (needsDone) {
            return jasminefunc(newDescription, function(done) {
                element.unshift(done);
                functionUnderTest.apply(this, element);
            });
        } else {
            return jasminefunc(newDescription, function() {
                functionUnderTest.apply(this, element);
            });
        }
    }.bind(this));
};


var JParams = function (args) {
    this.definitions = args;
    this.clauses = [];

    
    this.values = function () {
        var result = new JParams(this.definitions);
        helpers.valuesOf(arguments).forEach(function (element) {
            if (Array.isArray(element))
                result.clauses.push(element);
            else
                result.clauses.push([element]);
        });
        return result;
    }.bind(this);


    this.addValues = function() {
        var result = new JParams(this.definitions);
        result.clauses = this.clauses.slice();

        helpers.valuesOf(arguments).forEach(function (element) {
            if (Array.isArray(element))
                result.causes.push(element);
            else
                result.causes.push([element]);
        });
        
        return result;
    }.bind(this);

    
    this.it = parameterize.bind(this, it);
    this.xit = parameterize.bind(this, xit);
    this.iit = parameterize.bind(this, iit);
    
    this.describe = parameterize.bind(this, describe);
    this.ddescribe = parameterize.bind(this, ddescribe);
    this.xdescribe = parameterize.bind(this, xdescribe);
};

exports.iterate = function () {
    return new JParams(arguments);
};