var mongoose = require('mongoose');

module.exports = function(){

	var schema = mongoose.Schema({
		teste: {
		type: String,
		//default: "NAO GRAVO"
		required: true
		}
	});

	return mongoose.model('Lot', schema);	
};