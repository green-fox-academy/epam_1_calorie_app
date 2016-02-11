'use strict';


describe('test http requests', function() {

  beforeEach(module('CalorieApp'));

  var meals, $httpBackend, $location;

  beforeEach(inject(function(_meals_, _$httpBackend_, _$location_) {
    meals = _meals_;
    $httpBackend = _$httpBackend_;
    $location = _$location_;
    $httpBackend.when('GET', $location.absUrl() + 'meals/').respond([{}]);
    $httpBackend.when('POST', $location.absUrl() + 'meals/').respond([{}]);
    $httpBackend.when('DELETE', $location.absUrl() + 'meals/1').respond([{}]);
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should have a empty list', function() {
    expect(meals.list.length).toBe(0);
  });

  it('should return the list', function() {
    $httpBackend.expectGET($location.absUrl() + 'meals/');
    meals.getAll();
    $httpBackend.flush();
    expect(meals.list).toEqual([{}]);
  });

  it('the list shouldn\'t be empty after add', function() {
    var meal = {
      id: 1,
      name: 'apple',
      calories: 200,
      date: 0
    };

    $httpBackend.expectPOST($location.absUrl() + 'meals/', meal);
    meals.addItem(meal);
    $httpBackend.flush();
    expect(meals.list.length).toBe(1);
  });

  it('the list should be empty after add and delete', function() {
    var meal = {
      id: 1,
      name: 'apple',
      calories: 200,
      date: 0
    };

    $httpBackend.expectPOST($location.absUrl() + 'meals/', meal);
    meals.addItem(meal);
    $httpBackend.flush();
    expect(meals.list.length).toBe(1);

    $httpBackend.expectDELETE($location.absUrl() + 'meals/'+ meal.id);
    meals.deleteItem(meal);
    $httpBackend.flush();
    expect(meals.list.length).toBe(0);
  });
});
