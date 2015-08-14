/*
	Aqui ficará a estratégia de configuração de nossa autenticação
*/
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');

module.exports = function(){

	var Usuario = mongoose.model('Usuario');

	passport.use(new localStrategy(
	{
		usernameField: 'login',
		passwordField: 'senha'

	},
		function(login, senha, done){
			Usuario.findOne({login: login}, function(err, user){

				//console.log("username "+login);
				//console.log("senha "+senha);
				//console.log("user "+user);

				if(err) {return done(err);}
				if(!user) { return done(null, false); }
				if(user.senha != senha) { return done(null, false); }

				return done(null, user);

			});
		}));

	passport.serializeUser(function(usuario, done){
		done(null, usuario._id);
	});

	passport.deserializeUser(function(id, done){
		Usuario.findById(id).exec()
			.then(function(usuario){
				done(null, usuario);
			});
	});

};