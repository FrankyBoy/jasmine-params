# jasmine-params
#### Parameterization for jasmine tests
Based on [Neckbeard.js](https://github.com/desirable-objects/neckbeard.js/)  
Allows BDD style looping in your jasmine specifications. 

## Usage
### setting up the loop ...

you can loop with one variable

    loop2 = jparams.iterate('num').values(1,2,3,4);

or with multiple variables

    loop = jparams
        .iterate('first', 'second', 'expected')
        .values([3,  3,  6],
                [10, 4, 14],
                [7,  1,  8]);

### using the loop ...

    loop.it('runs for number #num', function(num){
      expect(num).toBeGreaterThan(0);
    });

or for multiple values

    loop.it('#first + #second should be #expected', function(first, second, expected){
      expect(first + second).toBe(expected);
    });

### using with async tests

If the first parameter of your function is called "done", the variable will work like normal "done" in jasmine. 

### supported methods

* it
* iit
* xit
* describe
* ddescribe
* xdescribe
