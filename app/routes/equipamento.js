function varificaAutenticacao(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}else{
		res.status('401').json('não autorizado');
	}
};

module.exports = function(app){

	var controller = app.controllers.equipamento;

	app.route('/equipamento/situacao')
			.get(varificaAutenticacao, controller.situacao); 

	app.route('/equipamento')
		.get(varificaAutenticacao, controller.listaEquipamentos)
		.post(varificaAutenticacao, controller.salvaEquipamento);	



	//rota para deletar um memorando
	app.route('/equipamento/:id')
			.get(varificaAutenticacao, controller.obtemEquipamentos)
			.delete(varificaAutenticacao, controller.removeEquipamento);


	
};