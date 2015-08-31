function varificaAutenticacao(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}else{
		res.status('401').json('não autorizado');
	}
};

module.exports = function(app){

	var controller = app.controllers.configuracao;

	app.route('/configuracao/lotacao')
			.get(varificaAutenticacao, controller.listaLotacoes)
			.post(varificaAutenticacao, controller.salvaLotacao);

	app.route('/configuracao/lotacao/:id')
			.get(varificaAutenticacao, controller.obtemLotacao)
			.delete(varificaAutenticacao, controller.removeLotacao);

	app.route('/configuracao/operacao')
			.get(varificaAutenticacao, controller.listaOperacoes)
			.post(varificaAutenticacao, controller.salvaOperacao);

	app.route('/configuracao/operacao/:id')
			.get(varificaAutenticacao, controller.obtemOperacao)
			.delete(varificaAutenticacao, controller.removeOperacao);

	app.route('/configuracao/situacao')
			.get(varificaAutenticacao, controller.listaSituacoes)
			.post(varificaAutenticacao, controller.salvaSituacao);

	app.route('/configuracao/situacao/:id')
			.get(varificaAutenticacao, controller.obtemSituacao)
			.delete(varificaAutenticacao, controller.removeSituacao);



};