var jparams = require('../index.js');

describe('spec which loops', function() {

    describe('Here is some functionality', function() {

        jparams
            .iterate('firstNumber', 'secondNumber', 'sum', 'difference')
            .for([3, 3, 6, 0],
                [10, 4, 14, 6],
                [7, 1, 8, 6]
            ).do('Hoping that #firstNumber plus #secondNumber is #sum, not #difference', function(firstNumber, secondNumber, sum, difference) {

                expect(firstNumber + secondNumber).toEqual(sum);
                expect(firstNumber - secondNumber).toEqual(difference);
            });

    });

    describe('Another quick functionality', function() {

        jparams
            .iterate('theNumber')
            .for(1, 2, 3, 4, 5)
            .do('This time, what should happen is #theNumber should be less than 6, greater than 0', function(theNumber) {
                expect(theNumber).toBeLessThan(6);
                expect(theNumber).toBeGreaterThan(0);
            });
    });

    describe('An async example', function() {

        jparams
            .iterate('theNumber')
            .for(500, 1000)
            .do('Sleeep for #theNumber ms and still assert', function (done, theNumber) {
                setTimeout(function() {
                    //Silly assertion as an example
                    expect(theNumber).toEqual(theNumber);
                    done();
                }, theNumber);
            });

    });

});