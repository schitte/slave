var express = require('express');
var app = express();

app.get('/test', function (req, res) {
 res.send('null');
});

app.listen(process.env.PORT, function() {
    console.log('Server running on ' + process.env.PORT);
});
