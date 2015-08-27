angular.module('cartic').controller('EquipamentoController', function($http, $scope, $routeParams, Equipamento){

	//seta o filter como vazio
	$scope.$on('equipamento', function(event, data){
		$scope.equipamentos = data;
	});


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