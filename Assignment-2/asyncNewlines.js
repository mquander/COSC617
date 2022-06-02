/*import chalk from 'chalk';
import { exit } from 'process';
import fs from 'fs';*/
var chalk = require('chalk');
const {exit} = require('process');
var fs = require('fs');

//error handling if file not provided
if(process.argv.length < 3){
    console.log(chalk.red("No file found"));
    exit(1);
}
// read file passed as argument in command line
fs.readFile(process.argv[2], function(err, data) {
    // error handling if the filename cannot be read
    if(err){
        console.log(chalk.red("No file found"));
        exit(1);
    }
    // convert the buffer to a string for processing
    var contents = data.toString();
    // split the string on the newlines into an array
    contents = contents.split("\n");
    // print out the number of new lines, the array length minus 1
    console.log(chalk.green("new lines in " + process.argv[2] + ": " + (contents.length - 1)));
});

