angular.module('cartic').controller('FiltroController', function($scope, EquipamentoServices, MemorandoServices, UsuarioServices){

	$scope.apiSearch = function(){

		var service, eventName;

		if($rootScope.currentController == 'EquipamentoController'){
			service = EquipamentoServices;
			eventName = 'equipamento';

		}else if($rootScope.currentController == 'MemorandoController'){
			service = MemorandoServices;
			eventName = 'memorando';

		}else if($rootScope.currentController == 'UsuarioController'){
			service = UsuarioServices;
			eventName = 'usuario';
		}

		service.query({query: $scope.global.search}, function(resp){

			$scope.$broadcast(eventName, resp);
		});
	}
});
