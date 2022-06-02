var cheerio = require('cheerio');
var request = require('request');
var nodemailer = require('nodemailer');
const { exit } = require('process');
const credentials = require('./credentials.json');

// check if user entered input
if(process.argv.length < 3){
    console.log("You did not specify any artist");
    exit();
}
// setup transporter object
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: credentials.sender_email,
        pass: credentials.sender_password
    }
});
// URL to scrape
var url = 'http://www.popvortex.com/music/charts/top-rap-songs.php';

// create mailOptions object from credentials.json data 
let mailOptions = {
    from: credentials.from,
    to: credentials.to,
    subject: 'Your Artist(s) are: ',
    text: 'artists',
    html: ''
};
// specify subject line for email from user input
var n = 2;
if(process.argv.length > 3){
    while(n < process.argv.length - 1){
        mailOptions.subject += process.argv[n] + ', ';
        n++;
    }
    mailOptions.subject += ' and ' + process.argv[n];

}else if(process.argv.length == 3){
    mailOptions.subject += process.argv[n];
}
// GET request to URL
request(url, function(error, response, html){
    if(!error && response.statusCode == 200)
        //console.log('request OK');

    var $ = cheerio.load(html); // use cheerio to load buffer into '$' 
    var artistsArray = []; // array to capture artists found
    var htmlElement = 'p.title-artist';
    
    // loop thru first 25 <p.title-artist> in website
    $(htmlElement).each(function(i, element){
        var artist, title; // variables to store artists and titles found
        
        if(i < 25){
            
            for(var j=2; j < process.argv.length; j++){
                // check if each html element contains the artist entered by the user
                if($(element).text().includes(process.argv[j])){
                    title = $(element).children('cite.title').text(); //capture title from element's child
                    artist = $(element).children('em.artist').text(); //capture artist from element's child
                    artistsArray.push(artist); // add artist to array
                    mailOptions.html += ('<p> <b>'+ artist +':</b> <i> '+ title +'</i> </p>'); // update the email's html
                }
            }
        }
    });
    /* nodemailer code
    if at least 1 artist is found, send email with artist and title */
    if(artistsArray.length > 0){
        // use transporter object to send email
        transporter.sendMail(mailOptions, function(err, info){
            if(err)
                return console.log(err);
            
            console.log('Email sent');
        });
    }else{
        console.log("Artist(s) not found.")
    }
});

