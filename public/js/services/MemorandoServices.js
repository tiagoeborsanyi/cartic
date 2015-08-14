angular.module('cartic').factory('Memorando', function($resource){

	return $resource('/inicio/:id');
});