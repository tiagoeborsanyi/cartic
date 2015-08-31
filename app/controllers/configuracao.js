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

		var _id = req.params.id;
		Lotacao.findById(_id).exec()
			.then(
				function(lotacao){
					if(!lotacao) throw new error('Lotacao não encontrado');
					res.json(lotacao);
				},
				function(erro){
					console.log(erro);
					res.status(404).json(erro);
				});

	};

	controller.removeLotacao = function(req, res){

		var id = req.params.id;

		Lotacao.remove({_id : id}).exec()
			.then(
				function(){
					res.status(204).end();
				},
				function(erro){
					return console.error(erro);
				});

	};

	controller.salvaLotacao = function(req, res){

		var _id = req.body._id;

		var dados = {
			"teste" : req.body.teste
		};



		console.log("SALVALOTACAO "+dados.teste);

		if(_id){
			Lotacao.findByIdAndUpdate(_id, dados).exec()
				.then(
					function(lotacao){
						res.json(lotacao);
					},
					function(erro){
						console.error(erro);
						res.status(500).json(erro);
					});
		}else{
			console.log("SALVALOTACAO 2 "+req.body.teste);
			Lotacao.create(req.body)
				.then(
					function(lotacao){
						res.status(201).json(lotacao);
					},
					function(erro){
						console.log(erro);
					});
		}

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

	controller.removeOperacao = function(req, res){

		var id = req.params.id;

		Operacao.remove({_id : id}).exec()
			.then(
				function(){
					res.status(204).end();
				},
				function(erro){
					return console.error(erro);
				});

	};

	controller.salvaOperacao = function(req, res){

		 var operacao = new Operacao(req.body);
		operacao.save(function(erro, operacao){
			if(erro){
				res.status(500).end();
				console.log(erro);
			}else{
				res.json(operacao);
			}
		});
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

	controller.removeSituacao = function(req, res){

		var id = req.params.id;

		Situacao.remove({_id : id}).exec()
			.then(
				function(){
					res.status(204).end();
				},
				function(erro){
					return console.error(erro);
				});

	};

	controller.salvaSituacao = function(req, res){

		var situacao = new Situacao(req.body);
		situacao.save(function(erro, situacao){
			if(erro){
				res.status(500).end();
				console.log(erro);
			}else{
				res.json(situacao);
			}
		});
	};

	return controller;

};