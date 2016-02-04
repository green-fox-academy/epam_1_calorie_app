'use strict';

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

});
