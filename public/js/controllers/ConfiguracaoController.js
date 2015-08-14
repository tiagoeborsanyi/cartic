angular.module('cartic').controller('ConfiguracaoController', function($http, $scope, $routeParams, Configuracao){

	$scope.lotacao = function(){
			
					
	};

	$scope.situacaoLista = function(){

	};

	$scope.operacaoLista = function(){

	};

	$http.get('/configuracao/lotacao').success(function(lotacao){


					$scope.lot = lotacao;
					//console.log(lotacao);
					
				
			},
			function(erro){
				console.log(erro);
				console.log('não foi possível obter a lista de lotações.');
			});

});