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

	var id = 0;
	$scope.adicionalinha = function(){




			$http.get('/inicio/'+$routeParams.id).success(
				function(memorando){
					console.log("memorando tamanho "+memorando.tabela.length);
					id += memorando.tabela.length;
				},
				function(erro){
					console.log('não foi possível obter o tamanho do array')
				});




	$("#btn-adiciona").on('click', function(event){


		event.preventDefault();



		var tdConteudo = '<td><input type="text" id="t'+id+'" placeholder="Tombo" class="input-small" required ng-model="memorando.tabela.tombo"></td>'+
						'<td><input type="text" id="d'+id+'" placeholder="Descrição" class="input-medium" required ng-model="memorando.tabela.descricao"></td>'+
						'<td><input type="text" id="l'+id+'" placeholder="Local" class="input-xlarge" required ng-model="memorando.tabela.local"></td>'+
						'<td>'+
							'<select id="s'+id+'" required ng-model="memorando.tabela.situacao">'+
								'<option value="ETANA">EM TRÂNSITO ANÁLISE</option>'+
								'<option value="ETREV">EM TRÂNSITO REVISÃO </option>'+
								'<option value="ETBFORN">EM TRÂNSITO BOM PARA FORNECER</option>'+
								'<option value="ETMANUT">EM TRÂNSITO PARA MANUTENÇÃO</option>'+
								'<option value="ETCEXT">EM TRÂNSITO CHAMADO EXTERNO</option>'+
								'<option value="ETPRBX">EM TRÂNSITO PROCESSO DE BAIXA</option>'+
								'<option value="ETBXDEF">EM TRÂNSITO BAIXA DEFINITIVA</option>'+
								'<option value="DEVPEN">DEVOLUÇÃO PENDENTE</option>'+
								'<option value="PEND">PENDENTE</option>'+
								'<option value="MANUT">MANUTENÇÃO</option>'+
								'<option value="MANUT">Fornecido</option>'+
							'</select>'+
						'</td>'+
						'<td><a id="'+id+'" class="remove-item" href=""><i class="icon-remove"></i></a></td>';


						++id;


		$('<tr>').append(tdConteudo).appendTo('#tabela-body');


		});


	};


	$scope.removelinha = function(event){


		$("#tabela").on('click', '.remove-item', function(event){

			event.preventDefault();

			$(this).closest("tr").remove();
			id--;
			console.log(this);
		});

	};




$scope.adicionalinha();
$scope.removelinha();

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

	//função para remover um item (equipamento especifico do memorando)
	$scope.removeItem = function(tabela){
		Memorando.get({id: $routeParams.id},
			function(memorando){
				$scope.memorando = memorando;
			},
			function(erro){
				console.log(erro);
				console.log('não foi possível obter o memorando')
			});
	};


	//Criamos uma function para salvar um memorando que ainda nao exista no banco de dados
	$scope.salva = function(){


		var t;
		$scope.memorando.tabela = new Array();
		for(var i = 0; i < id; i++){

			t = new Object();
			t.tombo = $("#t"+i).val();
			t.descricao = $("#d"+i).val();
			t.local = $("#l"+i).val();
			t.situacao = $("#s"+i+" option:selected").text();
			$scope.memorando.tabela.push(t);
		}

		$scope.memorando.lotacaosaida = $("#provider-json-1").val();
		$scope.memorando.lotacaodestino = $("#provider-json-2").val();
		$scope.memorando.assunto = $("#valoroperacao option:selected").text();
		$scope.memorando.$save()
				.then(function(){
					console.log("salvo com sucesso.");
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


//Esta dando erro na parte de match. Como resolve?