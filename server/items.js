'use strict';

var pg = require('pg');
var url = process.env.DATABASE_URL;

function getAll(callback) {
  sendQuery({query: 'SELECT * FROM meals'}, callback);
}

function addItem(params, callback) {
  console.log(params);
  sendQuery({
      query: 'INSERT INTO meals(id, name, calories, date) VALUES ($1, $2, $3, $4)',
      attributes:[params.id, params.name, params.calories, params.date]
    }, callback);
}

function sendQuery(options, callback) {
  pg.connect(url, function(err, client, done) {
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
