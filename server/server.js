'use strict';

function CreateServer() {
	var express = require('express');
	var bodyParser = require('body-parser');

	var Connection = require('./connection.js');
	var Queries = require('./queries.js');
	var Service = require('./service.js');

	var connection = new Connection();
	var queries = new Queries(connection);
	var service = new Service(queries);

	var app = express();
	app.use(bodyParser.json());

	var path = require('path');
	var route = path.join(__dirname, '..', 'public');
	app.use(express.static(route));

	app.get('/meals', service.getAll);
	app.post('/meals', service.addItem);
	app.delete('/meals/:id', service.deleteItem);

	return app;
}

module.exports = CreateServer;
