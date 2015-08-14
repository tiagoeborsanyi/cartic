var http = require('http');
var app = require('./config/express')();
require('./config/passport')();
require('./config/database.js')('mongodb://localhost/cartic');

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express cartic escutando na porta '+app.get('port'));
});