var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

app.use(bodyParser.urlencoded({
 extended: true
}));

app.use(bodyParser.json());

app.get('/test', function (req, res) {
 res.send('null');
});

app.post('/api/turing/submit', function (req, res) {
 var urlBase = 'https://www.google.com/recaptcha/api/siteverify'
 var secret = process.env.CAPTCHA_SECRET;
 var name = req.body.name;
 var data = req.body['g-recaptcha-response'];
 console.log("form submitted by: " + name);
 urlBase = urlBase + "?secret=" + secret + "&response=" + data;
 
 request({
   url: urlBase,
   method: 'POST'
  },
  function(error, response, body) {
   console.log(body);
   console.log(typeof(body));
   var success = JSON.parse(body).success;
   console.log(success);
   if(success === true) {
    var text = "Congrats " + name + "!" + "\n"
    + "You are a human!"
    res.send(text);
   } else {
    var text = "Sod off you filthy non-organic";
    res.send(text);
   }
 });
});

app.listen(process.env.PORT, function() {
 console.log('Server running on ' + process.env.PORT);
});
