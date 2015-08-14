angular.module('cartic').controller('UsuarioController', function($scope, $routeParams, Usuario){


	//setar o filtro para vazio para retornar
	$scope.$on('usuario', function(event, data){
		$scope.usuarios = data;
	});



	//retorna todos os usuarios do banco de dados
	function buscaUsuarios(){

		Usuario.query(
			function(usuarios){
				$scope.usuarios = usuarios;
			},
			function(erro){
				console.log('Não foi possível obter a lista de usuários.');
				console.log(erro);
			});
	};

	buscaUsuarios();

	$scope.removeUser = function(usuario){

		var confirmar = confirm("Tem certeza que deseja excluir usuário?");

		if(confirmar == true){
			Usuario.delete({id: usuario._id},
				buscaUsuarios,
				function(erro){
					console.log("Não foi possível remover usuário.");
					console.log(erro);
				});
		}
		console.log(usuario);
	};


	if($routeParams.usuarioId){

		Usuario.get({id: $routeParams.usuarioId},
		function(usuario){
			$scope.usuario = usuario;
			
		},
		function(erro){
			console.log(erro);
			console.log('não foi possível obter o usuario');
		});
	}else{
		//cria um novo objeto usuario
		$scope.usuario = new Usuario();
	}

	$scope.salva = function(){

		console.log("USUARIO "+ $scope.usuario.nome);

		$scope.usuario.$save()
			.then(function(){
				console.log("usuario salvo "+ $scope.usuario.nome);
				//limpa o form
				$scope.usuario = new Usuario();
			})
			.catch(function(erro){
				console.log("não foi possivel salvar o memorando "+ erro);
			});
	};

});