var jparams = require('../index.js');

describe('spec which loops', function() {

    describe('Here is some functionality', function() {

        jparams
            .iterate('firstNumber', 'secondNumber', 'sum', 'difference')
            .values([3, 3, 6, 0],
                [10, 4, 14, 6],
                [7, 1, 8, 6]
            ).it('Hoping that #firstNumber plus #secondNumber is #sum, not #difference', function(firstNumber, secondNumber, sum, difference) {

                expect(firstNumber + secondNumber).toEqual(sum);
                expect(firstNumber - secondNumber).toEqual(difference);
            });

    });

    describe('Another quick functionality', function() {

        jparams
            .iterate('theNumber')
            .values(1, 2, 3, 4, 5)
            .it('This time, what should happen is #theNumber should be less than 6, greater than 0', function(theNumber) {
                expect(theNumber).toBeLessThan(6);
                expect(theNumber).toBeGreaterThan(0);
            });
    });
    
    jparams
        .iterate('theNumber')
        .values(1, 2, 3, 4, 5)
        .describe('Iterating a describe-block - #theNumber', function(theNumber) {

            it('adds five', function() {
                var result = theNumber + 5;
                expect(result).toBeGreaterThan(5);
                expect(result).toBeLessThan(11);
            });
            
            it('times two', function() {
                var result = theNumber * 2;
                expect(result).toBeGreaterThan(1);
                expect(result).toBeLessThan(11);
            });
    });

    describe('An async example', function() {

        jparams
            .iterate('theNumber')
            .values(500, 1000)
            .it('Sleeep for #theNumber ms and still assert', function (done, theNumber) {
                setTimeout(function() {
                    //Silly assertion as an example
                    expect(theNumber).toEqual(theNumber);
                    done();
                }, theNumber);
            });

    });

});