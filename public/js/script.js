'use strict';

var app = angular.module('CalorieApp', []);

app.factory('meals', function($http) {
  return {
    url: 'https://calorie-counter-epam1.herokuapp.com/meals/',
    list: [],
    getAll: function() {
      var _this = this;
      $http.get(_this.url).then(function (response) {
        _this.list = response.data;
      });
    },
    addItem: function(newMeal) {
      var _this = this;
      $http.post(_this.url, newMeal).success(function() {
        _this.list.push(newMeal);
      });
    },
    deleteItem: function(item) {
      var _this = this;
      var url = _this.url + item.id;
      $http.delete(url, {id: item.id}).success(function() {
        var index = _this.list.indexOf(item);
        _this.list.splice(index, 1);
      });
    }
  };
});

app.controller('AddCtrl', function($scope, meals) {
  $scope.meal = 'add meal';
  $scope.calorie = {value : 0} ;
  $scope.date = {
    value: new Date()
  };

  $scope.addMeal = function() {
    var newMeal = {
      name: $scope.meal,
      calories : $scope.calorie.value,
      date: $scope.date.value
    };
    meals.addItem(newMeal);
  };
});

app.controller('ListCtrl', function($scope, meals) {
  $scope.getMeals = function() {
    return meals.list;
  };

  $scope.removeMeal = function(item) {
    return meals.deleteItem(item);
  };

  meals.getAll();
});
