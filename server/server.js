"use strict";


var express = require('express');
var app = express();
var items = require('./items');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

items.addMeal({name: 'csoki', calorie: '420'});
items.addMeal({name: 'kavezzunk pls', calorie: '50'});

app.use(express.static('public'));

app.get('/meals', function(req, res) {
	res.json(items.allMeals());
});

app.post('/meals', function(req, res) {
	var meal = items.addMeal(req.body);
	res.status(201).json(item);
}

app.listen(port, function() {
	console.log('Listening on port 3000...');
});
