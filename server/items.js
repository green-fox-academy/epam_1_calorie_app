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
    VALUES (${params.name}, ${params.calories}, ${params.date})
    RETURNING id`,
    function(err, result) {
      var id = result.rows[0].id;
      getItem(id, callback);
    });
}

function getItem(id, callback) {
  sendQuery(SQL`
    SELECT id, name, calories, date FROM meals
    WHERE id=${id}`, callback);
}

function sendQuery(query, callback) {
  pg.connect(databaseUrl, function(connectError, client, done) {
    if (connectError) {
      callback(connectError);
    } else {
      client.query(query, function (queryError, result) {
        done();
        callback(queryError, result);
      });
    }
  });
}

module.exports = {
  getAll : getAll,
  addItem: addItem
};
