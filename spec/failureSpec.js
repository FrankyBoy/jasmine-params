var jparams = require('../index.js');


describe("Failure", function () {
    var iterator = jparams.iterate('test').values(1, 2, 3);

    it('should fail with too few args', function() {
        var testFn = function() {
            iterator.it('should fail with too few args', function() {})
        };

        expect(testFn).toThrow();
    });

    it('should fail with too many args', function () {
        var testFn = function() {
            iterator.it('should fail with too few args', function (a, b, c) { })
        }

        expect(testFn).toThrow();
    });
})
