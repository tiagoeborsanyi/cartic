angular.module('cartic').factory('Lot', function($resource){

	return $resource('/configuracao/lotacao/:id');

});