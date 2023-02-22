var ender = function(ending){
    return function(input){
        return input + ending;
    }
}


var starter = (start) => (input) => start + input;
var a = ender('a')
var b = ender('b')



var q = starter('1')
var w = starter('2')
console.log(q(w('3')))


console.log(ender(ender('b')('a'))('c'))
