angular.module('cartic').factory('Usuario', function($resource){

	return $resource('/usuario/:id');
});