'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var pg = require('pg');

app.use(express.static('public'));

app.listen(port, function() {
	console.log('Listening on port 3000...');
});

app.get('/meals', function (request, response) {
	getAll(function (err, result) {
		if (err)
		{ console.error(err); response.send('Error ' + err); }
		else
		{ response.json(result.rows); }
	});
});

function getAll(callback) {
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query('SELECT * FROM meals', function(err, result) {
			done();
			callback(err, result);
		});
	});
}
