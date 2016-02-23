angular.module('cartic').controller('EquipamentoController', function($http, $scope, $routeParams, Equipamento){

	//seta o filter como vazio
	$scope.$on('equipamento', function(event, data){
		$scope.equipamentos = data;
	});


	$scope.page = 0;
	$scope.equipamentos = [];
	$scope.fetching = false;

	/*
		O código para fazer a busca própria de memorandos
		estava no MemorandoController, usando um evento
		de JQuery que eu apaguei.
	*/

	// Fetch more items
	$scope.getMore = function() {
		$scope.fetching = true;
		$http.get('/equipamento/?'+ $scope.page).then(function(equipamentos) {
			console.log('teste', equipamentos.data);
			$scope.fetching = false;
			// Append the items to the list
			$scope.equipamentos = $scope.equipamentos.concat(equipamentos.data);
		});
		$scope.page++;
	};





	//retorna todos os equipamentos
	function buscaEquipamentos(){

		Equipamento.query(
			function(equipamentos){
				$scope.equipamentos = equipamentos;
			},
			function(erro){
				console.log("Não foi possivel obter a lista de equipamentos");
				console.log(erro);
			});
	};

	buscaEquipamentos();

	function retornaequipamentos(){
		$http.get('/equipamento').success(function(equipamentos){
			$scope.equipamentos = equipamentos;
		},
		function(erro){
			console.log(erro);
		});
	};

	$scope.remove = function(equipamento){

		var confirmar = confirm("Tem certeza que deseja excluir?");

		if(confirmar == true){
			Equipamento.delete({id: equipamento.tombo},
				buscaEquipamentos,
				function(erro){
					console.log('Não foi possível remover o equipamento');
					console.log(erro);
				});
		}

	};



	if($routeParams.equipamentoId){

		Equipamento.get({id: $routeParams.equipamentoId},
		function(equipamento){
			$scope.equipamento = equipamento;

		},
		function(erro){
			console.log(erro);
			console.log('não foi possível obter o equipamento');
		});
	}else{
		//cria um novo objeto equipamento
		$scope.equipamento = new Equipamento();
	}

	$scope.salva = function(){

		console.log("Equipamento "+ $scope.equipamento.tombo);

		$scope.equipamento.$save()
			.then(function(){
				console.log("equipamento salvo "+ $scope.equipamento.tombo);
				//limpa o form
				$scope.equipamento = new Equipamento();
			})
			.catch(function(erro){
				console.log("não foi possivel salvar o equipamento "+ erro);
			});
	};

	$scope.situacao = function(){

		console.log("dentro de function situacao "+$scope.eqpt.situacao.situacao);

		$http.get('/equipamento/situacao').success(function(situacao){

			var b = [];
			for(var i = 0; i < situacao.length; i++){
				var obj = situacao[i];
				if($scope.eqpt.situacao.situacao == situacao[i]['situacao']){

					b.push(situacao[i]);
				}
			}

			$scope.ept = b;
			console.log($scope.ept);

		},
		function(erro){
			console.log(erro);
			console.log('não foi possível obter o equipamento');
		});
	};

	$scope.operacao = function(){

		console.log("dentro de function operacao "+$scope.eqpto.operacao.operacao);

		$http.get('/equipamento/operacao').success(function(operacao){

			var b = [];
			console.log("OPERACAO "+operacao[0]['assunto']);
			for(var i = 0; i < operacao.length; i++){
				//var obj = operacao[i];
				if($scope.eqpto.operacao.operacao == operacao[i]['assunto']){

					b.push(operacao[i]);
				}
			}

			$scope.opr= b;
			console.log($scope.opr);

		},
		function(erro){
			console.log(erro);
			console.log('não foi possível obter o equipamento');
		});

	};

	//function para fazer relatório histórico da lotacao que esta na pagina de relatórios-equipamentos
	$scope.transacao = function(){

		$http.get('/equipamento/transacao').success(function(transacao){

			var b = [];

			$scope.status = $scope.lot.lotacao.teste;

			for(var i = 0; i < transacao.length; i++){

				if(($scope.lot.lotacao.teste == transacao[i]['lotacaosaida']) || ($scope.lot.lotacao.teste == transacao[i]['lotacaodestino'])){

					b.push(transacao[i]);
				}
			}

			$scope.trans= b;
		},
		function(erro){
			console.log(erro);
			console.log('não foi possível obter o histórico da lotação');
		});

	};

	function selecionaSituacao(){

		$http.get('/configuracao/situacao').success(function(situacaolista){

			$scope.situacoes = situacaolista;

		},
		function(erro){
			console.log(erro);
			console.log('não foi possível obter o equipamento');
		});
	};

	function selecionaOperacao(){

		$http.get('/configuracao/operacao').success(function(operacaolista){

			$scope.operacoes = operacaolista;

		},
		function(erro){
			console.log(erro);
			console.log('não foi possível obter o equipamento');
		});
	};

	function selecionaLotacao(){

		$http.get('/configuracao/lotacao').success(function(lotacaoLista){

			$scope.lotacoes = lotacaoLista;

		},
		function(erro){
			console.log(erro);
			console.log('não foi possível obter o equipamento');
		});

	};

	selecionaOperacao();
	selecionaSituacao();
	selecionaLotacao();



});
