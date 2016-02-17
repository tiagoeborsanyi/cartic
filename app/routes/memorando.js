function varificaAutenticacao(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}else{
		res.status('401').json('não autorizado');
	}
};

module.exports = function(app){

	var controller = app.controllers.memorando;


	//criar rota para o json das lotações
	app.route('/inicio/lotacoes')
		.get(varificaAutenticacao, controller.listaLotacoes);


	/*****
			VAMOS CRIAR AS ROTAS PARA PAGINA DE INICIO
	*****/

	app.route('/inicio')
		.get(controller.listaMemorandos)
		.post(varificaAutenticacao, controller.salvaMemorando);

	//rota para deletar um memorando
	app.route('/inicio/:id')
			.get(varificaAutenticacao, controller.obtemMemorandos)
			.delete(varificaAutenticacao, controller.removeMemorando);

};
