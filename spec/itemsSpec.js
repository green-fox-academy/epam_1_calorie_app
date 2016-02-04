'use strict';

describe('Items', function() {
  var items = require('../server/items');

  describe('when getAll() called', function() {
    it('it should return with an object', function(done) {
      items.getAll(function(err, result) {
        var type = typeof result;
        expect(type).toBe('object');
        done();
      });
    });
  });

  describe('when addItem() called', function() {
    it('it should return with the created item', function(done) {
      var params = {
        'name': 'something',
        'calories': 100,
        'date': '2016-01-26:12:03:10'
      };
      items.addItem(params, function(err, result) {
        expect(typeof result.rows[0]).toBe('object');
        done();
      });
    });
  });

});
