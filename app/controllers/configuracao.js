module.exports = function(app){

	var Lotacao = app.models.lot;
	var Operacao = app.models.opr;
	var Situacao = app.models.situ;

	var controller = {};

	controller.listaLotacoes = function(req, res){

		Lotacao.find().exec()
			.then(
				function(lotacoes){
					res.json(lotacoes);
				},
				function(erro){
					console.error(erro);
					res.status(500).json(erro);
				});
	};

	controller.obtemLotacao = function(req, res){

	};


	controller.listaOperacoes = function(req, res){

		Operacao.find().exec()
			.then(
				function(operacoes){
					res.json(operacoes);
				},
				function(erro){
					console.error(erro);
					res.status(500).json(erro);
				});
	};

	controller.obtemOperacao = function(req, res){

	};

	controller.listaSituacoes = function(req, res){

		Situacao.find().exec()
			.then(
				function(situacoes){
					res.json(situacoes);
				},
				function(erro){
					console.error(erro);
					res.status(500).json(erro);
				});
	};

	controller.obtemSituacao = function(req, res){

	};

	return controller;
	
};