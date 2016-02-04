'use strict';

describe('Meals', function() {

  var Meals = require('../server/items');
  var meals = new Meals();

  beforeEach(function() {
    spyOn(meals, 'sendQuery');
    meals.getAll('callback');
  });

  it('tracks all the arguments of its calls', function() {
    expect(meals.sendQuery).toHaveBeenCalledWith('SELECT id, name, calories, date FROM meals', 'callback');
  });

});
