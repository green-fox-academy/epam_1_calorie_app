'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config.js');
var path = require('path');

var Queries = require('./queries.js');
var Connection = require('./connection.js');
var connection = new Connection();
var queries = new Queries(connection);
var Service = require('./service.js');
var service = new Service(queries);

var port = process.env.PORT || config.defaultPort;
var app = express();

var route = path.join(__dirname, '..', 'public');
app.use(express.static(route));
app.use(bodyParser.json());

app.listen(port, function() {
	console.log('Listening on port ' + port + '...');
});

app.get('/meals', service.getAll);
app.post('/meals', service.addItem);
app.delete('/meals/:id', service.deleteItem);
