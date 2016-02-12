'use strict';

var SQL = require('sql-template-strings');

describe('Meals', function() {
    var connection = {};
    var Meals = require('../server/meals_queries');
    var meals = new Meals(connection);

  beforeEach(function() {
    connection.sendQuery = function (query, callback) {
      return callback(null, [{}]);
    };
  });

  describe('getAll()', function() {
    it('tracks all the arguments of its calls', function() {
      spyOn(connection, 'sendQuery');
      meals.getAll('callback');
      expect(connection.sendQuery).toHaveBeenCalledWith('SELECT id, name, calories, date FROM meals', 'callback');
    });
  });

  describe('addItem()', function() {
    it('tracks all the arguments of its calls', function() {
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
