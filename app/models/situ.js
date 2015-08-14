var mongoose = require('mongoose');

module.exports = function(){

	var schema = mongoose.Schema({
		situacao: {
		type: String,
		required: true
		}
	});

	return mongoose.model('Situ', schema);	
};