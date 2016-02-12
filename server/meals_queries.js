'use strict';

var SQL = require('sql-template-strings');

function Meals(connection) {
  this.getAll = function (callback) {
    connection.sendQuery('SELECT id, name, calories, date FROM meals', callback);
  };

  this.addItem = function (params, callback) {
    connection.sendQuery(
      SQL`
      INSERT INTO meals (name, calories, date)
      VALUES (${params.name}, ${params.calories}, ${params.date})
      RETURNING id, name, calories, date`,
      callback
    );
  };

  this.deleteItem = function (id, callback) {
    connection.sendQuery(
      SQL`
      DELETE FROM meals WHERE id = ${id}
      RETURNING id, name, calories, date`,
      callback
    );
  };
}

module.exports = Meals;
