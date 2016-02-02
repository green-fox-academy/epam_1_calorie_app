"use strict";

var MealItem = function () {
  this.id = nextId();
  this.name = "";
  this.calorie = "";
}

MealItem.prototype.update = function(attributes) {
  this.name = attributes.name || "";
  this.calorie = attributes.calorie || "";
};

var currId = 0;
function nextId() {
  return ++currId;
}

var items = {};


function addMeal(attributes) {
  var meal = new MealItem();
  item.update(attributes);
  items[item.id] = item;
  return item;
}


function allMeals() {
  var values = [];
  for (var id in items) {
    values.push(items[id]);
  }
  return values;
}

module.exports = {
  addMeal: addMeal,
  allMeals: allMeals,
};