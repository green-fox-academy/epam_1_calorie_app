'use strict';

var pg = require('pg');
var config = require('./config.js');

function Connection() {
  var _this = this;
  this.databaseUrl = process.env.DATABASE_URL || config.databaseUrl;

  this.sendQuery = function (query, callback) {
    pg.connect(_this.databaseUrl, function(connectError, client, done) {
      if (connectError) {
        callback(connectError);
      } else {
        client.query(query,function (queryError, result) {
          done();
          callback(queryError, result);
        });
      }
    });
  };
}

module.exports = Connection;
