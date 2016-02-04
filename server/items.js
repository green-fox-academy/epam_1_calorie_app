'use strict';

var pg = require('pg');
var config = require('./config.js');
var SQL = require('sql-template-strings');

var databaseUrl = process.env.DATABASE_URL || config.databaseUrl;

function Meals() {
  this.getAll = function (callback) {
    this.sendQuery('SELECT id, name, calories, date FROM meals', callback);
  };

  this.addItem = function (params, callback) {
    this.sendQuery(SQL`
      INSERT INTO meals (name, calories, date)
      VALUES (${params.name}, ${params.calories}, ${params.date})
      RETURNING id, name, calories, date`,
      callback);
    };

  this.deleteItem = function (id, callback) {
    this.sendQuery(SQL`
      DELETE FROM meals WHERE id = ${id}
      RETURNING id, name, calories, date`,
      callback);
    };

  this.sendQuery = function (query, callback) {
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
  };
}

module.exports = Meals;
