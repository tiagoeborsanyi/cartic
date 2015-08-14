var mongoose = require('mongoose');

module.exports = function(uri){

	mongoose.connect(uri);

	mongoose.connection.on('connected', function(){
		console.log('Mongoose! conectado em '+uri);
	});

	mongoose.connection.on('disconnected', function(){
		console.log('Mongoose! desconectado de '+uri);
	});

	mongoose.connection.on('error', function(){
		console.log('Mongoose! Erro na conexao: '+uri);
	});


	//fechando a conexao do banco via mongoose
	process.on('SIGINT', function(){

		mongoose.connection.close(function(){
			console.log('Mongoose, desconectado pelo termino da aplicação.');

			//indica que a finalização ocorreu sem erros
			process.exit(0);
		});
	});
}