angular.module('cartic').factory('Configuracao', function($resource){

	return $resource('/configuracao/lotacao/:id');

});