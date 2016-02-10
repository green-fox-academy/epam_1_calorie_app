'use strict';

describe('ListCtrl', function() {
  beforeEach(module('CalorieApp'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope.getMeals function', function() {
    it('renders a list of objects requested from server', function() {
      var $scope = {};
      var meals = {
        list:[{}],
        getAll: function() {}
    };
      var controller = $controller('ListCtrl', { $scope: $scope, meals: meals });
      expect($scope.getMeals()).toEqual([{}]);
    });
  });

  describe('$scope.removeMeal function', function() {
    it('removes an item from the loaded list', function() {
      var $scope = {};
      var meals = {
        list:[{}, {}],
        getAll: function() {},
        deleteItem: function(item) {return item;}
      };
      var controller = $controller('ListCtrl', { $scope: $scope, meals: meals });
      expect($scope.removeMeal('item')).toEqual('item');
    });
  });
});
