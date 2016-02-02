'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var pg = require('pg');

app.use(express.static('public'));

app.listen(port, function() {
	console.log('Listening on port 3000...');
});

var items = [
	{name: 'csoki', calorie: '420'},
	{name: 'kavezzunk pls', calorie: '50'}
];

app.get('/meals', function(req, res) {
	res.json(items);
});

app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send('Error ' + err); }
      else
       { response.json(result); }
    });
  });
});
