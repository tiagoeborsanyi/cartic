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
		
		
		var tdConteudo = '<td><input type="text" id="t'+id+'" placeholder="Tombo" required ng-model="memorando.tabela.tombo"></td>'+
						'<td><input type="text" id="d'+id+'" placeholder="Descrição" required ng-model="memorando.tabela.descricao"></td>'+
						'<td><input type="text" id="l'+id+'" placeholder="Local" required ng-model="memorando.tabela.local"></td>'+
						'<td><input type="text" id="s'+id+'" placeholder="Situação" required ng-model="memorando.tabela.situacao"></td>'+
						'<td><a id="'+id+'" class="remove-item" href=""><i class="icon-remove"></i></a></td>';

						//console.log(tdConteudo);
						++id;
						console.log(id)

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


	//Função para quando clicar no botão de editar ir para a pagina de edição do memorando
	if($routeParams.id){
		Memorando.get({id: $routeParams.id},
		function(memorando){
			$scope.memorando = memorando;
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
			t.situacao = $("#s"+i).val();
			$scope.memorando.tabela.push(t);
		}

		$scope.memorando.lotacaosaida = $("#provider-json-1").val();
		$scope.memorando.lotacaodestino = $("#provider-json-2").val();
		//console.log("SAIDA tabela: "+ $("#provider-json-1").val());
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