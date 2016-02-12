'use strict';

describe('Controller', function() {
  var request = require('supertest');
  var createServer = require('../server/server');
  var app;

  beforeEach(function() {
    var connection = {};
    connection.sendQuery = function (query, callback) {
      return callback(null, { rows: [{}] });
    };
    app = createServer(connection);
  });

  describe('GET /meals', function(){
    it('should respond with json', function(done){
      request(app)
        .get('/meals')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            done.fail(err);
          } else {
            expect(res.body).toEqual([{}]);
            done();
          }
        });
    });
  });

  describe('POST /meals', function (){
    it('should respond with json', function(done){
      var meal = { name: 'McIntosh', calories: 200, date: '2016-01-26:12:03:10'};
      request(app)
        .post('/meals')
        .expect('Content-Type', /json/)
        .send(meal)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            done.fail(err);
          } else {
            expect(res.body).toEqual([{}]);
            done();
          }
        });
    });
  });

  describe('DELETE /meals/:id', function (){
    it('should respond with json', function(done){
      var id = 1;
      request(app)
        .del('/meals/' + id)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            done.fail(err);
          } else {
            expect(res.body).toEqual([{}]);
            done();
          }
        });
    });
  });

});
