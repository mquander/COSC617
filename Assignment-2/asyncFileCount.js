/*import chalk from 'chalk';
import { exit } from 'process';
import fs from 'fs';
import path from 'path';*/
var chalk = require('chalk');
const { exit } = require('process');
var fs = require('fs');
var path = require('path');

// error handling if too many arguments are provided
if(process.argv.length > 4){
    console.log(chalk.red("Error, too many arguments"));
    exit(1);
}else if(process.argv.length < 4){ // error handling if not enough arguments provided
    console.log(chalk.red("Error, too few arguments"));
    exit(1);
}
var directory = process.argv[2];
var extension = process.argv[3];

// async function to read files from provided directory
fs.readdir(directory, function(err, files){
    
    var count = 0;
    // loop through array of files and count those with matching extension
    files.forEach( function(element){
        if(path.extname(element) == extension){
            count++;
        }
    })
    // display whether files with extension were found
    if(count == 0)
        console.log(chalk.red("No files found with " + extension));
    else
        console.log(chalk.green(count + " files have the extension " + extension));
});
