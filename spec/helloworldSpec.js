describe("Hello world", function() {
  var sayHelloWorld = require('../lib/helloworld');

  it("creates the first jasmin test ever", function() {
    expect(sayHelloWorld()).toBe('Hello World');
  });
});
