'use strict';

describe('ListCtrl', function() {
  beforeEach(module('CalorieApp'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('$scope.getMeals() method', function() {
    it('renders a list of objects requested from server', function() {
      var $scope = {};
      var meals = {
        meals: [{}],
        getAll: function() {return meals.meals;},
        fetchAll: function() {}
    };
      var controller = $controller('ListCtrl', { $scope: $scope, meals: meals });
      expect($scope.getMeals()).toEqual( [{}] );
    });
  });

  describe('$scope.removeMeal() method', function() {
    it('removes an item from the loaded list', function() {
      var $scope = {};
      var meals = {
        meals: [{}, {}],
        getAll: function() {return meals.meals;},
        fetchAll: function() {},
        deleteItem: function(item) {return item;}
      };
      var controller = $controller('ListCtrl', { $scope: $scope, meals: meals });
      expect($scope.removeMeal('item')).toEqual('item');
    });
  });
});
