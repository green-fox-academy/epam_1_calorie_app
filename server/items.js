'use strict';

var pg = require('pg');
var databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:sqltest@localhost/postgres';

function getAll(callback) {
  sendQuery({
    query: 'SELECT * FROM meals'
    }, callback);
}

function addItem(params, callback) {
  // TODO: handle dates
  sendQuery({
    query: 'INSERT INTO meals(name, calories) VALUES ($1, $2)',
    attributes: [params.name, params.calories]
    }, callback);
}

function sendQuery(options, callback) {
  pg.connect(databaseUrl, function(err, client, done) {
    client.query(options.query, options.attributes, function (err, result) {
      done();
      callback(err, result);
    });
  });
}

module.exports = {
  getAll : getAll,
  addItem: addItem
};
