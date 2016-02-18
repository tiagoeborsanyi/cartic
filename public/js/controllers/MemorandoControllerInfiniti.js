(function() {
  var myApp = angular.module('cartic', ['ngRoute', 'ngResource', 'infinite-scroll']);

  myApp.controller('MemorandoControllerInfiniti', function ($scope, Memorando){
    $scope.memorandos = new Memorando;
    console.log("TESTE");
  });
    myApp.factory('Memorando', function ($http, $resource) {
      var Contents = function() {
        this.itens = [],
        this.busy = false,
        this.page = 1
      }

      Memorando.prototype.nextPage = function(){
        var url = $resource('/inicio/1');
        $http.get(url).success(function(data){
          console.log(data);
          for(var i = 0; i < data.length; i++){
            this.itens.push(data[i]);
          }
          this.page++;
        });
      };
    return Contents;
  });
}).call(this);
