'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var item = require('./items.js');
var path = require('path');

var port = process.env.PORT || 3000;
var app = express();

var route = path.join(__dirname, '..', 'public');
console.log(__dirname);
console.log(route);
app.use(express.static(route));

app.use(bodyParser.json());

app.listen(port, function() {
	console.log('Listening on port ' + port + '...');
});

app.get('/meals', function (request, response) {
	item.getAll(function (err, result) {
		if (err)
		{ console.error(err); response.send('Error ' + err); }
		else
		{ response.json(result.rows); }
	});
});

app.post('/meals', function(request, response) {
	item.addItem(request.body, function(err, result) {
		if (err)
		{ console.error(err); response.send('Error ' + err); }
		else
		{ response.json(result); }
	});
});
