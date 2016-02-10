'use strict';


var config = require('./server/config.js');
var Server = require('./server/server.js');

var app = new Server();

var port = process.env.PORT || config.defaultPort;
app.listen(port, function() {
	console.log('Listening on port ' + port + '...');
});
