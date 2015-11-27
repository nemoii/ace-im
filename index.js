var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 80));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use('/api', require('./api'));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

app.use(function (req, res) {
	res.redirect('/');
});

var io = require('socket.io').listen(app.listen(app.get('port')));

require('./handle-io')(io);
