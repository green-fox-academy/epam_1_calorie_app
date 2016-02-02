'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var item = require('./items.js');

app.use(express.static('public'));

app.listen(port, function() {
	console.log('Listening on port 3000...');
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
	console.log(request);
	// item.addItem(request.body, function(err, result) {
	// 	if (err)
	// 	{ console.error(err); response.send('Error ' + err); }
	// 	else
	// 	{ response.json(result); }
	// });
});
