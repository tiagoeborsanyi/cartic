module.exports = function(app){

	//guarda uma referencia ao model na instancia do express passada como parametro para o módulo
	var Usuario = app.models.usuario;

	var controller = {};

	controller.listaUsuarios = function(req, res){

		//Lista todos os usuarios usando consultas via mongoose
		Usuario.find().exec()
			.then(
				function(usuarios){
					res.json(usuarios);
				},
				function(erro){
					console.error(erro);
					//error 500 => intyernal server error
					res.status(500).json(erro);
				}
			);
	};



	controller.obtemUsuarios = function(req, res){

		var _id = req.params.id;
		Usuario.findById(_id).exec()
			.then(
				function(usuario){
					if(!usuario) throw new error('Usuario não encontrado');
					res.json(usuario);
				},
				function(erro){
					console.log(erro);
					res.status(404).json(erro);
				});

	};

	//function remove um usuário
	controller.removeUsuario = function(req, res){

		var id = req.params.id;

		Usuario.remove({_id : id}).exec()
			.then(
				function(){
					res.status(204).end();
				},
				function(erro){
					return console.error(erro);
				});

	};

	controller.salvaUsuario = function(req, res){

		/* var usuario = new Usuario(req.body);
		usuario.save(function(erro, usuario){
			if(erro){
				res.status(500).end();
				console.log(erro);
			}else{
				res.json(usuario);
			}
		}); */

		var id = req.body._id;
		if(id){
			Usuario.findByIdAndUpdate(id, req.body).exec()
				.then(
					function(usuario){
						res.json(usuario);
					},
					function(erro){
						console.error(erro);
						res.status(500).json(erro);
					});
		}else{
			Usuario.create(req.body)
				.then(
					function(usuario){
						res.status(201).json(usuario);
					},
					function(erro){
						console.log(erro);
					});
		}

	};


	return controller;

};