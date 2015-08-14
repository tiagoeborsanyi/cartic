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
			.get(varificaAutenticacao, controller.listaLotacoes);

	app.route('/configuracao/operacao')
			.get(varificaAutenticacao, controller.listaOperacoes);

	app.route('/configuracao/situacao')
			.get(varificaAutenticacao, controller.listaSituacoes);

	app.route('/configuracao/lotacao/:id')
			.get(varificaAutenticacao, controller.obtemLotacao);

};