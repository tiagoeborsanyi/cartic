angular.module('cartic', ['ngRoute', 'ngResource', 'tagged.directives.infiniteScroll']).config(function($routeProvider){

	$routeProvider.when('/inicio', {
		templateUrl: '/partials/visualizaMemorando.html',
		controller: 'MemorandoControllerInfinite'
	});

	/*
		Eu posso criar uma url para mostrar somente os resultados de buscas,
		quando o botão for clicado
		ex: /inicio/busca
		Assim quando o usuário clicar no botão de buscar ele irá parar nessa url
	*/

	$routeProvider.when('/memorando/:id', {
		templateUrl: '/partials/editaMemorando.html',
		controller: 'MemorandoController'
	});

	$routeProvider.when('/memorando/imprime/:id', {
		templateUrl: '/partials/imprimeMemorando.html',
		controller: 'MemorandoController'
	});

	$routeProvider.when('/memorando/', {
		templateUrl: '/partials/editaMemorando.html',
		controller: 'MemorandoController'
	});

	/*
		ROTAS PARA OS OBJETOS USUARIOS
	*/
	$routeProvider.when('/cadastra/usuario/', {
		templateUrl: '/partials/editaUsuario.html',
		controller: 'UsuarioController'
	});

	$routeProvider.when('/relatorios/usuario/', {
		templateUrl: '/partials/visualizaUsuario.html',
		controller: 'UsuarioController'
	});

	$routeProvider.when('/edita/usuario/:usuarioId', {
		templateUrl: '/partials/editaUsuario.html',
		controller: 'UsuarioController'
	});



	/*
		ROTAS PARA OS OBJETOS EQUIPAMENTOS
	*/
	$routeProvider.when('/cadastra/equipamento/', {
		templateUrl: '/partials/editaEquipamento.html',
		controller: 'EquipamentoController'
	});

	$routeProvider.when('/relatorios/equipamento/', {
		templateUrl: '/partials/visualizaEquipamento.html',
		controller: 'EquipamentoController'
	});

	$routeProvider.when('/edita/equipamento/:equipamentoId', {
		templateUrl: '/partials/editaEquipamento.html',
		controller: 'EquipamentoController'
	});



	/*
		ROTAS PARA OS OBJETOS ADMINISTRAÇÃO
	*/
	$routeProvider.when('/administracao/configuracao/', {
		templateUrl: '/partials/configuracao.html',
		controller: 'ConfiguracaoController'
	});


	$routeProvider.otherwise({redirectTo: '/inicio'});
});


/*
autocomplete jqeury + ajax:
https://www.devbridge.com/sourcery/components/jquery-autocomplete/
https://api.jquery.com/change/
*/
