'use strict';

var SQL = require('sql-template-strings');

describe('Meals', function() {

  describe('getAll()', function() {
    it('tracks all the arguments of its calls', function() {
      var connection = {};
      connection.sendQuery = function (query, callback) {
        return callback(null, [{}]);
      };
      var Meals = require('../server/items');
      var meals = new Meals(connection);
      spyOn(connection, 'sendQuery');
      meals.getAll('callback');
      expect(connection.sendQuery).toHaveBeenCalledWith('SELECT id, name, calories, date FROM meals', 'callback');
    });
  });

  describe('addItem()', function() {
    it('tracks all the arguments of its calls', function() {
      var connection = {};
      connection.sendQuery = function (query, callback) {
        return callback(null, [{}]);
      };
      var Meals = require('../server/items');
      var meals = new Meals(connection);
      var params = {name: 'name', calories: 'calories', date: 'date'};
      spyOn(connection, 'sendQuery');
      meals.addItem(params,'callback');
      expect(connection.sendQuery).toHaveBeenCalledWith(SQL`
      INSERT INTO meals (name, calories, date)
      VALUES (${params.name}, ${params.calories}, ${params.date})
      RETURNING id, name, calories, date`,
      'callback');
    });
  });

  describe('deletItem()', function() {
    it('tracks all the arguments of its calls', function() {
      var connection = {};
      connection.sendQuery = function (query, callback) {
        return callback(null, [{}]);
      };
      var Meals = require('../server/items');
      var meals = new Meals(connection);
      var id = '';
      spyOn(connection, 'sendQuery');
      meals.deleteItem(id, 'callback');
      expect(connection.sendQuery).toHaveBeenCalledWith(SQL`
      DELETE FROM meals WHERE id = ${id}
      RETURNING id, name, calories, date`,
      'callback');
    });
  });

});


