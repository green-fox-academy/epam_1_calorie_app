'use strict';

var pg = require('pg');
var url = process.env.DATABASE_URL;

function getAll(callback) {
  sendQuery({query: 'SELECT * FROM meals'}, callback);
}

function sendQuery(options, callback) {
  pg.connect(url, function(err, client, done) {
    client.query( options.query, function (err, result) {
      done();
      callback(err, result);
    });
  });
}

module.exports = {
  getAll : getAll
};
