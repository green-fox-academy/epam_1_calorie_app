'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var MealsQueries = require('./meals_queries.js');
var Controller = require('./controller.js');
var path = require('path');

function createServer(connection) {
	var queries = new MealsQueries(connection);
	var controller = new Controller(queries);

	var app = express();
	app.use(bodyParser.json());

	var route = path.join(__dirname, '..', 'public');
	app.use(express.static(route));

	app.get('/meals', controller.getAll);
	app.post('/meals', controller.addItem);
	app.delete('/meals/:id', controller.deleteItem);

	return app;
}

module.exports = createServer;
