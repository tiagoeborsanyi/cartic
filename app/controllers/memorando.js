	/*{_id: 1, lotacaosaida: 'Coord. Adm. Recursos de TIC - CARTIC',
		lotacaodestino: 'COO. ATENDIMENTO USUARIO',
		memorando: 'Nr 519-215 Tranferência de equipamentos de Tic',
		assunto: 'Subustituição de equipamento',
		equipamentos: { //vou criar um objeto equipamento referenciando dentro do objeto memorando
			id: objectId,
			reference: 'equipamento'},
		observacao: ' chamado 8408-15 seção atendimento especializado'
	},*/

module.exports = function(app){

	var Memorando = app.models.memorando;
	var Equipamento = app.models.equipamento;
	var Lotacao = app.models.lot;

	var controller = {};


	controller.listaMemorandos = function(req, res){
		console.log(req._parsedOriginalUrl.query);
		var page = req._parsedOriginalUrl.query
		Memorando.find().limit(4).skip(page * 4).sort({data : -1}).populate('usuario').exec()
			.then(
				function(memorandos){
					res.json(memorandos);
				},
				function(erro){
					console.error(erro);
					res.status(500).json(erro);
				});

	};

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


	controller.obtemMemorandos = function(req, res){

		var _id = req.params.id;
		Memorando.findById(_id).exec()
			.then(
				function(memorando){
					if(!memorando) throw new error('Memorando não encontrado');
					res.json(memorando);
				},
				function(erro){
					console.log(erro);
					res.status(404).json(erro);
				});

	};

	//function para remover o memorando
	controller.removeMemorando = function(req, res){

		var _id = req.params.id;
		Memorando.remove({"_id" : _id}).exec()
			.then(
				function(){
					res.status(204).end();
				},
				function(erro){
					return console.error(erro);
				});

	};

	controller.salvaMemorando = function(req, res){

		var _id = req.body._id;


		var dados = {
			"lotacaosaida" : req.body.lotacaosaida,
			"lotacaodestino" : req.body.lotacaodestino,
			"numeromemorando" : req.body.numeromemorando,
			"assunto" : req.body.assunto,
			"tabela" : req.body.tabela,
			"observacao" : req.body.observacao,
			"usuario" : req.user._id
		};


		console.log("reqBody "+req.body.tabela[0].tombo);

		if(_id){

			Memorando.findByIdAndUpdate(_id, dados).exec()
				.then(
					function(memorando){
						console.log('MEMORANDO '+memorando);
						res.json(memorando);
					},
					function(erro){
						console.error(erro);
						res.status(500).json(erro);
					});

			for(var i = 0; i < req.body.tabela.length; i++){

			var tab = {
				"tombo" : req.body.tabela[i].tombo,
				"descricao" : req.body.tabela[i].descricao,
				"local" : req.body.tabela[i].local,
				"situacao" : req.body.tabela[i].situacao,
				"lotacaosaida" : req.body.lotacaosaida,
				"lotacaodestino" : req.body.lotacaodestino,
				"assunto" : req.body.assunto
			};

			Equipamento.create(tab)
				.then(
					function(equipamento){
						res.status(201).json(equipamento);
					},
					function(erro){
						console.log(erro);
						res.status(500).json(erro);
					});
			}


		}else{


			for(var i = 0; i < req.body.tabela.length; i++){

			var tab = {
				"tombo" : req.body.tabela[i].tombo,
				"descricao" : req.body.tabela[i].descricao,
				"local" : req.body.tabela[i].local,
				"situacao" : req.body.tabela[i].situacao,
				"lotacaosaida" : req.body.lotacaosaida,
				"lotacaodestino" : req.body.lotacaodestino,
				"assunto" : req.body.assunto
			};

			Equipamento.create(tab)
				.then(
					function(equipamento){
						res.status(201).json(equipamento);
					},
					function(erro){
						console.log(erro);
						res.status(500).json(erro);
					});
		}


			Memorando.create(dados)
				.then(
					function(memorando){
						res.status(201).json(memorando);
					},
					function(erro){
						console.log(erro);
						res.status(500).json(erro);
					});
		}

	};

	return controller;
};
