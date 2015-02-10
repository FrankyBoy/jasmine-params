# 0.3.0
* stricter detection if function definition and parameters match
* for async methods, "done" moved to the last parameter (because it makes more sense)

# 0.2.0
* support for the other jasmine methods ((x/i)it (x/d)describe)
* renaming methods
* more tests
* further cleanup
* possibility to add/change values without altering existing object

# 0.1.0
* general cleanup of existing codebase
* removing tons of unneeded stuff (whole copy of jasmine, express, etc etc)
* making the module work with instances instead of one global scope -> allows to have two iterators side-by-side
* switch to arrays as inputs for the testdata (i.e. each set of input data is an array instead of converting from unstructured args)
* new name
