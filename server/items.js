'use strict';

var pg = require('pg');
var config = require('./config.js');
var SQL = require('sql-template-strings');

var databaseUrl = process.env.DATABASE_URL || config.databaseUrl;

function getAll(callback) {
  sendQuery('SELECT id, name, calories, date FROM meals', callback);
}

function addItem(params, callback) {
  sendQuery(SQL`
    INSERT INTO meals (name, calories, date)
    VALUES (${params.name}, ${params.calories}, ${params.date})
    RETURNING id, name, calories, date`,
    callback);
}

function deleteItem(id, callback) {
  sendQuery(SQL`
    DELETE FROM meals WHERE id = ${id}
    RETURNING id, name, calories, date`,
    callback);
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
  addItem: addItem,
  deleteItem: deleteItem
};
