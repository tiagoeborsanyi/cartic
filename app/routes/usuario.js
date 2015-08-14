function varificaAutenticacao(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}else{
		res.status('401').json('não autorizado');
	}
};

module.exports = function(app){

	var controller = app.controllers.usuario;

	app.route('/usuario')
		.get(varificaAutenticacao, controller.listaUsuarios)
		.post(varificaAutenticacao, controller.salvaUsuario);	     

	//rota para deletar um memorando
	app.route('/usuario/:id')
			.get(varificaAutenticacao, controller.obtemUsuarios)
			.delete(varificaAutenticacao, controller.removeUsuario);
};