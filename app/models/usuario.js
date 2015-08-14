var mongoose = require('mongoose');

module.exports = function(){

	var schema = mongoose.Schema({

		nome: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			index: {
				unique: true
			}
		},
		administrador: {
			type: Boolean,
			required: true
		},
		login: {
			type: String,
			required: true,
			index: {
				unique: true
			}
		},
		senha: {
			type: String,
			required: true
		}

	});

	return mongoose.model('Usuario', schema);
};