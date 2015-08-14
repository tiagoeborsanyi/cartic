var adicionaLinha = function(e){

	console.log(e);

	var id = 0;

	$("#btn-adiciona").on('click', function(event){

		event.preventDefault();
		
		
		var tdConteudo = '<td><input type="text" id="" placeholder="Tombo"></td>'+
						'<td><input type="text" id="" placeholder="Descrição"></td>'+
						'<td><input type="text" id="" placeholder="Local"></td>'+
						'<td><input type="text" id="" placeholder="Situação"></td>'+
						'<td><a id="'+id+'" class="remove-item" href=""><i class="icon-remove"></i></a></td>';

						//console.log(tdConteudo);
						id++;
						console.log(id)

		$('<tr>').append(tdConteudo).appendTo('#tabela-body');

	});
};

var removeLinha = function(event){

	
	$("#tabela").on('click', '.remove-item', function(event){

		event.preventDefault();

		$(this).closest("tr").remove();
		console.log('cliquei');
	});
		
};
console.log("memorandojs");
//adicionaLinha('teste');
removeLinha();

$(document).ready(adicionaLinha('oi'));