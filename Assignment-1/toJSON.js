// Assignment 1, part 1

var fs = require("fs"); // import the FileSystem module
const { exit } = require("process"); // import the Process global object

var input = process.argv;

// check that the number of arguments is not more than 3
if(process.argv.length > 3){
    console.log("Error, only 1 argument allowed to be read in");
    exit(1);
}else if(process.argv.length < 3){
    console.log("Error, must submit a text file as an argument to be read in");
    exit(1);
}
// read in the file passed as a command line argument
var buffer = fs.readFileSync(process.argv[2]);

// convert the buffered data to string and store in a variable
var output = buffer.toString();

// split the text in the file by new line
var outputSplit = output.split("\n");

// check if the last line is an empty string
if(outputSplit[outputSplit.length - 1] == "")
    outputSplit.pop();

// check if there are less than 3 lines of text in the file
if(outputSplit.length < 3){
    console.log("Error, file must have at least 3 lines");
    exit(1);
}
// concatenate lines 4 thru n into 'otherText' variable
var otherText = "";
if(outputSplit.length > 3){
    var i = 3;
    while(i < outputSplit.length){
        otherText += outputSplit[i].replace("\r", " ");
        i++;
    }
}else{
    otherText += "N/A"; // ..or set 'otherText' to N/A if there's only 3 lines
}

// create JSON object of the data, delete the '/r' substring at the end
var jsonObj = {
    'fname' : outputSplit[0].replace("\r", ""),
    'lname' : outputSplit[1].replace("\r", ""),
    'location' : outputSplit[2].replace("\r", ""),
    'other' : otherText
}

console.log(jsonObj);