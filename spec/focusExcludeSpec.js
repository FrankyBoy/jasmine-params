var jparams = require('../index.js');

describe('focus and ignored TCs', function () {
    var iterator = jparams
        .iterate('theNumber')
        .values(1, 2, 3, 4, 5);

    describe('xit should be ignored', function() {
        iterator.xit('should be ignored', function (theNumber) {
            expect(false).toBeTruthy();
        });

        it('should run', function() {
            expect(false).toBeFalsy();
        });
    });

    describe('iit should focus', function() {
        iterator.iit('should run', function (theNumber) {
            expect(false).toBeFalsy();
        });
        
        it('should not run', function () {
            expect(false).toBeTruthy();
        });
    });

});