var nodemailer = require("nodemailer"),
    fs = require('fs'),
    path = require('path'),
    moment = require('moment'),
    auth = require('../config');

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: auth.gmail
});

// setup e-mail data with unicode symbols
var mailOptions = {
    from: "Rhio Kim ✔ <rhio.kim@gmail.com>", // sender address
    to: "rhio.kim@gmail.com, rhio.kim@kt.com", // list of receivers
    subject: "Daily Node.js Tweets ✔", // Subject line
    text: "", // plaintext body
    html: "" // html body
}

var root = path.join('..', '.raw', moment().subtract('d', 1).format('YYYY/MM/DD'));
var file = path.join(root, 'node.js', 'index.html');
var html = fs.readFileSync(file, 'utf8');
mailOptions.html = html;

// send mail with defined transport object
smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }

    // if you don't want to use this transport object anymore, uncomment following line
    //smtpTransport.close(); // shut down the connection pool, no more messages
});
