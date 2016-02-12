'use strict';

var SQL = require('sql-template-strings');

describe('Meals', function() {
    var connection = {};
    var Meals = require('../server/meals_queries');
    var meals = new Meals(connection);
    var callback;

  beforeEach(function() {
    connection.sendQuery = function (query, callback) {
      return callback(null, [{}]);
    };
    callback = function(){};
    spyOn(connection, 'sendQuery').and.callThrough();
  });

  describe('getAll()', function() {
    it('tracks all the arguments of its calls', function() {
      meals.getAll(callback);
      expect(connection.sendQuery).toHaveBeenCalledWith('SELECT id, name, calories, date FROM meals', callback);
    });
  });

  describe('addItem()', function() {
    it('tracks all the arguments of its calls', function() {
      var params = {name: 'name', calories: 'calories', date: 'date'};
      meals.addItem(params, callback);
      expect(connection.sendQuery).toHaveBeenCalledWith(SQL`
      INSERT INTO meals (name, calories, date)
      VALUES (${params.name}, ${params.calories}, ${params.date})
      RETURNING id, name, calories, date`,
      callback);
    });
  });

  describe('deletItem()', function() {
    it('tracks all the arguments of its calls', function() {
      var id = '';
      meals.deleteItem(id, callback);
      expect(connection.sendQuery).toHaveBeenCalledWith(SQL`
      DELETE FROM meals WHERE id = ${id}
      RETURNING id, name, calories, date`,
      callback);
    });
  });

});
