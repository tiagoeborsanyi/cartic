var express = require('express');
var bodyParser = require('body-parser');

//ativa a parte de login
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

var load = require('express-load');

module.exports = function(){
	var app = express();
	//configurar a porta em que o express irá rodar
	app.set('port', 3000, "127.0.0.1");
	//setamos a pasta public para ficar visivel ao usuário
	app.use(express.static('./public'));

	app.set('view engine', 'ejs');
	app.set('views', './app/views');

	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(require('method-override')());

	//outra parte para criar a parte de login
	app.use(cookieParser());
	app.use(session({
		secret: 'ilovenodejs',
		resave: true,
		saveUninitialized: true
	}));
	app.use(passport.initialize());
	app.use(passport.session());
	

	load('models', {cwd: 'app'})
		.then('controllers')
		.then('routes')
		.into(app);


	return app;
};

