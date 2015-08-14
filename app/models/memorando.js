var mongoose = require('mongoose');

module.exports = function(){

	var schema = mongoose.Schema({

		lotacaosaida: {
			type: String,
			required: true
		},
		lotacaodestino: {
			type: String,
			required: true
		},
		numeromemorando: {
			type: String,
			required: true
		},
		assunto: {
			type: String,
			required: true
		},
		tabela: [],
		
		observacao: {
			type: String
		},
		usuario: {
			type: mongoose.Schema.ObjectId,
			ref: 'Usuario'
		},
		data: {
			type: Date,
			default: Date
		}

	});

	return mongoose.model('Memorando', schema);
};