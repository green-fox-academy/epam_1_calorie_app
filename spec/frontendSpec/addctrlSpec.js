'use strict';

describe('AddCtrl', function() {
  beforeEach(module('CalorieApp'));

  var $controller;

  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  describe('$scope.addMeal function', function() {
    it('', function() {
      var $scope = {};
      var meals = {
        list: [{}],
        addItem: function() {}
      };
      var newMeal = {
       name: $scope.meal,
       calories: $scope.calories,
       date : $scope.date
      };
      var controller = $controller('AddCtrl', {$scope: $scope, meals: meals});
      expect($scope.addMeal(newMeal)).toEqual(meals.addItem(newMeal));
    });
  });
});