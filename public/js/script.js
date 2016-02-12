'use strict';

var app = angular.module('CalorieApp', []);

app.factory('meals', function($http, $location) {
  var url = $location.absUrl() + 'meals/';
  var meals = [];

  function getAll() {
    return meals;
  }

  function fetchAll() {
    $http.get(url).then(function (response) {
      meals = response.data;
    });
  }

  function addItem(newMeal) {
    $http.post(url, newMeal).then(function () {
      meals.push(newMeal);
    });
  }

  function deleteItem(item) {
    $http.delete(url + item.id).then(function () {
      var index = meals.indexOf(item);
      meals.splice(index, 1);
    });
  }

  return {
    getAll: getAll,
    fetchAll: fetchAll,
    addItem: addItem,
    deleteItem: deleteItem
  };
});

app.controller('AddCtrl', function($scope, meals) {
  $scope.meal = 'add meal';
  $scope.calorie = {value : 0} ;
  $scope.date = {value: new Date()};

  $scope.addMeal = function() {
    var newMeal = {
      name: $scope.meal,
      calories: $scope.calorie.value,
      date: $scope.date.value
    };
    meals.addItem(newMeal);
  };
});

app.controller('ListCtrl', function($scope, meals) {
  $scope.getMeals = function() {
    return meals.getAll();
  };

  $scope.removeMeal = function(item) {
    return meals.deleteItem(item);
  };

  meals.fetchAll();
});
