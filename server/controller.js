'use strict';

function Controller(queries) {
  var _this = this;
  this.getAll = function (request, response) {
    queries.getAll(function (err, result) {
      _this.handleResponse(err, result, response);
    });
  };

  this.addItem = function (request, response) {
    queries.addItem(request.body, function(err, result) {
      _this.handleResponse(err, result, response);
    });
  };

  this.deleteItem = function (request, response) {
    queries.deleteItem(request.params.id, function(err, result) {
      _this.handleResponse(err, result, response);
    });
  };

  this.handleResponse = function (err, result, response) {
    if (err) {
      console.error(err);
      response.send('Error ' + err);
    }	else {
      response.json(result.rows);
    }
  };
}

module.exports = Controller;
