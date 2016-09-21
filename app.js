angular.module('appTareas', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
    .state('alta',{
      url:'/alta',
      templateUrl: 'views/alta.html',
      controller: 'ctrlAlta'
    })
    .state('editar',{
      url:'/editar/{id}',
      templateUrl: 'views/editar.html',
      controller: 'CtrlEditar'
    });
    $urlRouterProvider.otherwise('alta');
  })
  .controller('ctrlAlta',['$scope',function($scope){
    $scope.tarea= {};
    $scope.tareas = [];

    $scope.agregar = function(){
      $scope.tareas.push({
        nombre: $scope.tarea.nombre,
        prioridad: parseInt($scope.tarea.prioridad),

      });
    }

  }]);
