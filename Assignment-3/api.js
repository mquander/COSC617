var express = require('express'); //import statements
const { exit } = require('process');
const axios = require('axios');
var url = require('url');
var app = express();

// check that an argument is provided for the port number
if(process.argv.length < 3){
    console.log("Error: Please include the port number as an argument");
    exit(1);
}
var portNumber = process.argv[2];
// validate port number
if((portNumber) < 0 || (portNumber) > 65535 || (!/^\d+$/.test(portNumber))){
    console.log("Error: Please enter a port number between 0 and 65535");
    exit(1);
}
var btc = 25000, eth = 900, currentbtcPrice; // static and dynamic crypto prices

// handle GET request for the /api/btc endpoint, using a callback function
app.get("/api/btc", function(req, res){
    var parsedURL = url.parse(req.url, true); // parse URL
    var usd = parsedURL.query.usd;
    // validate the usd parameter
    if(!checkUSD(usd, res))
        return;
    // access the blockchain API, process data with a callback function
    axios.get('http://blockchain.info/ticker').then(function(res) {
        currentbtcPrice = res.data.USD['15m'];
    });
    var amount = usd / currentbtcPrice; // calculate amount of BTC based on current value
    // send status code and write data to the client
    res.writeHead(200, { 'Content-Type': 'text/plain' }).end(JSON.stringify({amount: amount}));

});

// handle GET request for the /api/eth endpoint, using a callback function
app.get("/api/eth", function(req, res){
    var parsedURL = url.parse(req.url, true); // parse URL
    var usd = parsedURL.query.usd;
    // validate the usd parameter
    if(!checkUSD(usd, res))
        return;
    // calculate amount of ETH
    var amount = usd / eth;
    // send status code and write data to the client
    res.writeHead(200, { 'Content-Type': 'text/plain' }).end(JSON.stringify({amount: amount}));
});

// for bad end points
app.get("*", function(req, res){
    var parsedURL = url.parse(req.url, true);

    if(parsedURL.pathname != "/api/btc" && parsedURL.pathname != "/api/eth"){
        res.writeHead(404, { 'Content-Type': 'text/plain' }).end("404 Page Not Found");
        return;
    }
});
// function to check user input: usd parameter and value
function checkUSD(usd, res){
    // check that usd parameter is written correctly in URL
    if(typeof usd === "undefined"){
        res.writeHead(404, { 'Content-Type': 'text/plain' }).end("Error, parameter must be 'usd'");
        console.log("Error, parameter must be 'usd'");
        return false;
    }else if(usd < 0){ // check that usd is not negative
        res.writeHead(404, { 'Content-Type': 'text/plain' }).end("Please enter positive USD amount");
        console.log("Please enter positive USD amount");
        return false;
    }else if(!/^\d+$/.test(usd)){ // check that usd is all numerical digits
        res.writeHead(404, { 'Content-Type': 'text/plain' }).end("Please enter a number for USD amount");
        console.log("Please enter a number for USD amount");
        return false;
    }
    return true;
}

app.listen(portNumber);