'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser);

var items = [
	{name: 'csoki', calorie: '420'},
	{name: 'kavezzunk pls', calorie: '50'}
];

app.get('/meals', function(req, res) {
	res.json(items);
});

app.listen(port, function() {
	console.log('Listening on port 3000...');
});
