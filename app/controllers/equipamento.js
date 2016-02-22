module.exports = function(app){

	var Equipamento = app.models.equipamento;
	var Memorando = app.models.memorando;

	var controller = {};

	controller.listaEquipamentos = function(req, res){
					Equipamento.find({}).populate('usuario').exec()
					.then(
						function(equipamentos){
							res.json(equipamentos);
						},
						function(erro){
							console.error(erro);
							res.status(500).json(erro);
				});
};



	controller.obtemEquipamentos = function(req, res){

		var _id = req.params.id;
		Equipamento.findById(_id).exec()
			.then(
				function(equipamento){
					if(!equipamento) throw new error('Usuario não encontrado');
					res.json(equipamento);
				},
				function(erro){
					console.log(erro);
					res.status(404).json(erro);
				});

	};

	//function remove um usuário
	controller.removeEquipamento = function(req, res){

		var tombo = req.params.id;
		Equipamento.remove({"tombo" : tombo}).exec()
			.then(
				function(){
					res.status(204).end();
				},
				function(erro){
					return console.error(erro);
				});

	};




	controller.salvaEquipamento = function(req, res){

		var  _id = req.body._id;

		var dados = {
			"tombo" : req.body.tombo,
			"descricao" : req.body.descricao,
			"situacao" : req.body.situacao,
			"usuario" : req.user._id
		};

		//console.log("equipamento user: "+req.user.login);

		//criar um if() para verificar se é um update ou não
		if(_id){

			Equipamento.findByIdAndUpdate(_id, dados).exec()
				.then(
					function(equipamento){
						//console.log("EQUIPAMENTO "+equipamento);
						res.json(equipamento);
					},
					function(erro){
						console.error(erro);
						res.status(500).json(erro);
					});

		}else{

			Equipamento.create(dados)
				.then(
					function(equipamento){
						res.status(201).json(equipamento);
					},
					function(erro){
						console.log(erro);
						res.status(500).json(erro);
					});
		}

	};


	controller.situacao = function(req, res){

		Equipamento.aggregate([
			    {$sort: { ultimaData: 1}},
			    {$group: {
			        _id: "$tombo",
			        situacao: {$last: "$situacao"},
			        ultimaData: {$last: "$data"},
			        descricao: {$last: "$descricao"}}

			    }
		  ], function(err, result){
		  	if(err){
		  		console.log("ERRO SITUACAO "+err);
		  		return;
		  	}


		  	//console.log("retur equipamento: "+result);
		  	res.json(result);

		  });

	};


	//A operação se refere ao assunto do memorando
	controller.operacao = function(req, res){

		Equipamento.aggregate([
			    {$sort: { ultimaData: 1}},
			    {$group: {
			        _id: "$tombo",
			        assunto: {$last: "$assunto"},
			        ultimaData: {$last: "$data"},
			        descricao: {$last: "$descricao"}}

			    }
		  ], function(err, result){
		  	if(err){
		  		console.log("ERRO OEPRACAO "+err);
		  		return;
		  	}


		  	//console.log("retur equipamento: "+result);
		  	res.json(result);

		  });

	};

	/*
	A transação é para listar o histórico de uma determinada lotação
	o menu esta localizado em relatórios -> equipamentos
	a parte de pesquisa será feita no controller do angular
	*/
	controller.transacao = function(req, res){

		Equipamento.find().sort( {data: -1} ).exec()
			.then(
				function(equipamentos){
					res.json(equipamentos);
				},
				function(erro){
					console.error(erro);
					res.status(500).json(erro);
			});
	};


	return controller;

};
