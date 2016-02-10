'use strict';


var config = require('./server/config.js');
var createServer = require('./server/server.js');
var Connection = require('./server/connection.js');
var connection = new Connection();

var app = createServer(connection);
var port = process.env.PORT || config.defaultPort;

app.listen(port, function() {
	console.log('Listening on port ' + port + '...');
});
