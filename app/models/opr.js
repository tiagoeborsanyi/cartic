var mongoose = require('mongoose');

module.exports = function(){

	var schema = mongoose.Schema({
		operacao: {
		type: String,
		required: true
		}
	});

	return mongoose.model('Opr', schema);	
};