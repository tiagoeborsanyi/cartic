angular.module('cartic').controller('ConfiguracaoController', function($http, $scope, $routeParams, $resource){

	var Lotacao = $resource('/configuracao/lotacao/:id');
	var Situacao = $resource('/configuracao/situacao/:id');
	var Operacao = $resource('/configuracao/operacao/:id');


	function buscaSituacoes(){

		Situacao.query(
			function(situacoes){
				$scope.situacoes = situacoes;
			},
			function(erro){
				console.log('Não foi possível obter a lista de situações.');
				console.log(erro);
			});
	};

	//function para remover uma situação
	$scope.removeSituation = function(situation){

		var confirmar = confirm("Tem certeza que deseja remover esta situação.");

		if(confirmar == true){
			Situacao.delete({id: situation._id},
				buscaSituacoes,
				function(erro){
					console.log("Não foi possível remover a situação.");
					console.log(erro);
				});
		}
		console.log(situation);
	};


	//lotacaoId ainda nao existe para ir para algum tipo de pagina de edição com o ID
	function verificaSituacaoId(){

		if($routeParams.situacaoId){

			Situacao.get({id: $routeParams.situacaoId},
			function(eqpt){
				$scope.eqpt = eqpt;

			},
			function(erro){
				console.log(erro);
				console.log('não foi possível obter o equipamento');
			});
		}else{
			//cria um novo objeto equipamento
			$scope.eqpt = new Situacao();
		}

	};

	verificaSituacaoId();
	buscaSituacoes();

	$scope.situacaoSalva = function(){

		$scope.eqpt.$save()
			.then(function(){
				console.log("lot salvo "+ $scope.eqpt.teste);
				//limpa o form
				$scope.eqpt = new Situacao();
			})
			.catch(function(erro){
				console.log("não foi possivel salvar a situação "+ erro);
			});


	};


	function buscaLotacoes(){

		Lotacao.query(
			function(lotacoes){
				$scope.lot = lotacoes;
			},
			function(erro){
				console.log('Não foi possível obter a lista de usuários.');
				console.log(erro);
			});

	};

	buscaLotacoes();

	$scope.removeLotation = function(lotation){

		var confirmar = confirm("Tem certeza que deseja remover esta situação.");

		if(confirmar == true){
			Lotacao.delete({id: lotation._id},
				buscaLotacoes,
				function(erro){
					console.log("Não foi possível remover a situação.");
					console.log(erro);
				});
		}
		console.log(lotation);
	};

	function verificaLotacaoId(){

		if($routeParams.lotacaoId){

			Lotacao.get({id: $routeParams.lotacaoId},
			function(lotacao){
				$scope.lotacao = lotacao;

			},
			function(erro){
				console.log(erro);
				console.log('não foi possível obter o equipamento');
			});
		}else{
			//cria um novo objeto equipamento
			$scope.lotacao = new Lotacao();
		}

	};

	verificaLotacaoId();


	$scope.salvaLotacao = function(){

			$scope.lotacao.$save()
			.then(function(){
				console.log("lot salvo "+ $scope.lotacao.teste);
				//limpa o form
				$scope.lotacao = new Lotacao();
			})
			.catch(function(erro){
				console.log("não foi possivel salvar o memorando "+ erro);
			});

	};

	function buscaOperacao(){

		Operacao.query(
			function(operacoes){
				$scope.operacoes = operacoes;
			},
			function(erro){
				console.log('Não foi possível obter as operações.');
				console.log(erro);
			});

	};

	buscaOperacao();

	$scope.removeOperation = funtion(operation){

		var confirmar = confirm("Tem certeza que deseja remover esta situação.");

		if(confirmar == true){
			Operacao.delete({id: operation._id},
				buscaOperacao,
				function(erro){
					console.log("Não foi possível remover a situação.");
					console.log(erro);
				});
		}
		console.log(operation);
	};


	function verificaOperacaoId(){

		if($routeParams.operacaoId){

			Operacao.get({id: $routeParams.operacaoId},
			function(opr){
				$scope.opr = opr;

			},
			function(erro){
				console.log(erro);
				console.log('não foi possível obter a operação.');
			});
		}else{
			//cria um novo objeto equipamento
			$scope.opr = new Operacao();
		}

	};

	verificaOperacaoId();

	$scope.operacaoSalva = function(){

		$scope.opr.$save()
			.then(function(){
				console.log("opr salvo ");
				//limpa o form
				$scope.opr = new Operacao();
			})
			.catch(function(erro){
				console.log("não foi possivel salvar a operação "+ erro);
			});

	};


});