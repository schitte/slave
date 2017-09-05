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
 console.log(req.body);
 var secret = process.env.CAPTCHA_SECRET;
 console.log(secret);
 var name = req.body.name;
 var data = req.body['g-recaptcha-response'];
 console.log(data);
 console.log("form submitted by: " + name);
 var input = {"secret": secret, "response": data};
 console.log(input);
 
 request({
   url: 'https://www.google.com/recaptcha/api/siteverify',
   method: 'POST',
   json: input,
  },
  function(error, response, body) {
   console.log(body);
   res.send(body);
 });
});

app.listen(process.env.PORT, function() {
 console.log('Server running on ' + process.env.PORT);
});
