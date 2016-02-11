'use strict';


describe('', function() {

  beforeEach(module('CalorieApp'));

  var meals, $httpBackend, $location;

  beforeEach(inject(function(_meals_, _$httpBackend_, _$location_) {
    meals = _meals_;
    console.log(meals);
    $httpBackend = _$httpBackend_;
    $location = _$location_;
    $httpBackend.when('GET', $location.absUrl() + '/meals').respond([{}]);
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should have a empty list', function() {
    expect(meals.list.length).toBe(0);
  });

  it('should have a empty list', function() {
    console.log($httpBackend);
    $httpBackend.expectGET($location.absUrl() + '/meals');
    meals.getAll();
    $httpBackend.flush();
    expect(meals.list).toEqual([{}]);
  });

});
