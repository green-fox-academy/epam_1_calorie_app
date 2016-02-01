describe("Hello world", function() {
  var sayHelloWorld = require('../public/js/helloworld');

  it("creates the first jasmin test ever", function() {
    expect(sayHelloWorld()).toBe('Hello World');
  });
});
