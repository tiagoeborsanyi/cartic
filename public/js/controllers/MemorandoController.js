angular.module('cartic').controller('MemorandoController', function($scope, $http, $routeParams, Memorando){

	$scope.filtro = '';

	/*
		Estamos buscando os dados do servidor
		passando a rota via get de qual controller queremos do express
	*/

	function buscaMemorandos(){

		Memorando.query(
			function(memorandos){
				$scope.memorandos = memorandos;
			},
			function(erro){
				console.log('Não foi possível obter a lista de memorandos.');
				console.log(erro);
			});
	}

	buscaMemorandos();

	$scope.myPagingInfinite = function() {

		console.log('tamanho biscamemorandos: '+buscaMemorandos.length);

	};

	$scope.remove = function(memorando){

		var confirmar = confirm("Tem certeza que deseja remover o memorando.");
		if(confirmar == true){
			Memorando.delete({id: memorando._id},
				buscaMemorandos,
				function(erro){
					console.log('Não foi possível remover a linha do memorandos.');
					console.log(erro);
					console.log(id);
				});
		}

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

	function selecionaSituacao(){

		$http.get('/configuracao/situacao').success(function(situacaolista){

			$scope.situacoes = situacaolista;

		},
		function(erro){
			console.log(erro);
			console.log('não foi possível obter o equipamento');
		});
	};

	selecionaSituacao();
	selecionaOperacao();

	$scope.adicionaItem = function(a) {

		if($scope.memorando.tabela === undefined || $scope.memorando.tabela === null){
			$scope.memorando.tabela = [];
			$scope.selecionalotacao = [{teste: 'Em Transito'}, {teste: $("#provider-json-2").val()}];
			console.log($("#provider-json-2").val());
		}

		console.log($scope.memorando.tabela);

		$scope.memorando.tabela.push({a});
	};

	$scope.removeItem = function(i) {
		$scope.memorando.tabela.splice(i, 1);
	};

	//funcção para fomatar a data
	function formataData(recebeData) {
		var dia = recebeData.slice(8, 10);
		var ano = recebeData.slice(0, 4);
		var mes = recebeData.slice(5, 7);
		var m;

		switch(parseInt(mes)) {
			case 01:
				m = "Janeiro";
				break;
			case 02:
				m = "Fevereiro";
				break;
			case 03:
				m = "Março";
				break;
			case 04:
				m = "Abril";
				break;
			case 05:
				m = "Maio";
				break;
			case 06:
				m = "Junho";
				break;
			case 07:
				m = "Julho";
				break;
			case 08:
				m = "Agosto";
				break;
			case 09:
				m = "Setembro";
				break;
			case 10:
				m = "Outubro";
				break;
			case 11:
				m = "Novembro";
				break;
			case 12:
				m = "Dezembro";
				break;
			default:
				m = "TESTE";
		}
		return dia + " " + m + " " + ano;
	};

	//Função para quando clicar no botão de editar ir para a pagina de edição do memorando
	if($routeParams.id){
		Memorando.get({id: $routeParams.id},
		function(memorando){
			$scope.memorando = memorando;

			$scope.diamesano = formataData(memorando.data);
		},
		function(erro){
			console.log(erro);
			console.log('não foi possível obter o memorando')
		});
	}else{
		//cria um novo objeto memorando
		$scope.memorando = new Memorando();
	}

	//Criamos uma function para salvar um memorando que ainda nao exista no banco de dados
	$scope.salva = function(){

		if($scope.memorando.tabela !== undefined){
			$scope.memorando.tabelas = new Array();
			var t = $scope.memorando.tabela.length;
			for(var i = 0; i < t; i++){
				$scope.memorando.tabelas.push($scope.memorando.tabela[i]);
			}
			console.log($scope.memorando.tabelas);
		}

		$scope.memorando.lotacaosaida = $("#provider-json-1").val();
		$scope.memorando.lotacaodestino = $("#provider-json-2").val();
		$scope.memorando.assunto = $("#valoroperacao option:selected").text();
		$scope.memorando.$save()
				.then(function(){
					//$scope.mensagem = "Memorando salvo com sucesso.";
					//limpa o form
					$scope.memorando = new Memorando();
					$('#tabela-body').html('');
				})
				.catch(function(erro){
					console.log("Não foi possível salvar memorando.");
					console.log(erro);
				})
	};

	var opt;
	$http.get('/inicio/lotacoes').success(function(lotacao){
				opt = {
				url: '/inicio/lotacoes',

				getValue: "teste",

				list: {
					match: {
						enabled: true
					}
				}
			};

			$("#provider-json-1").easyAutocomplete(opt);
			$("#provider-json-2").easyAutocomplete(opt);
	},
	function(erro){
		console.log(erro);
	});

});
