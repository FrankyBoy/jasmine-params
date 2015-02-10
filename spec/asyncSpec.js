var jparams = require('../index.js');

describe('An async example', function () {
    jparams
        .iterate('theNumber')
        .values(500, 1000)
        .it('Sleep for #theNumber ms and still assert', function (theNumber, done) {
            setTimeout(function () {
                //Silly assertion as an example
                expect(theNumber).toEqual(theNumber);
                done();
            }, theNumber);
        });

});