angular.module('cartic').factory('Equipamento', function($resource){

	return $resource('/equipamento/:id');
});