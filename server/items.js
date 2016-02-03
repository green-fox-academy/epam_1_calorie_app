'use strict';

var pg = require('pg');
var SQL = require('sql-template-strings');

var databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:epam1@localhost/postgres';

function getAll(callback) {
  sendQuery('SELECT * FROM meals', callback);
}

function addItem(params, callback) {
  sendQuery(SQL`
    INSERT INTO meals (name, calories, date)
    VALUES (${params.name}, ${params.calories}, ${params.date})`,
    callback);
}

function sendQuery(query, callback) {
  pg.connect(databaseUrl, function(err, client, done) {
    client.query(query, function (err, result) {
      done();
      callback(err, result);
    });
  });
}

module.exports = {
  getAll : getAll,
  addItem: addItem
};
