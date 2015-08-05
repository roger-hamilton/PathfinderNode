var express = require('express');
var app = express();

app.use(express.static('dist'));
app.use(express.static('node_modules/bootstrap/dist'));
app.use(express.static('node_modules/jquery/dist'));

app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.render('index');
});
app.get('/live', function (req, res) {
  res.render('live');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
