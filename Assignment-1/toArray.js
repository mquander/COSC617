// Assignment 1, part 2

// store command line arguments in variable
var input = process.argv;
// declare an array variable
var array = [];

// loop thru array and only store command line arguments index 2 thru n
input.forEach(function(element) {
    
    if(input.indexOf(element) > 1)
        array.push(element);
});

// display length and contents to terminal
console.log("Array length: " + array.length);

if(array.length == 0)    
    array = "Nothing";

console.log("Array contains: " + array);  
