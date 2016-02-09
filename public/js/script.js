'use strict';

var app = angular.module('CalorieApp', []);

app.factory('meals', function($http) {
  return {
    list: [],
    getAll: function() {
        var _this = this;
        $http.get('http://calorie-counter-epam1.herokuapp.com/meals').then(function (response) {
          _this.list = response.data;
      });
    },
    addItem: function(newMeal) {
      var _this = this;
      $http.post('http://calorie-counter-epam1.herokuapp.com/meals', newMeal).success(function() {
        _this.list.push(newMeal);
      });
    }
  };
});

app.controller('FormCtrl', function($scope, $http, meals) {
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

app.controller('ListCtrl', function($scope, $http, meals) {
  $scope.getMeals = function() {
    return meals.list;
  };
  meals.getAll();
});
