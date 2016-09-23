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
    $scope.prioridades = ['Baja', 'Media', 'Alta']

    $scope.agregar = function(){
      $scope.tareas.push({
        nombre: $scope.tarea.nombre,
        prioridad: parseInt($scope.tarea.prioridad),

      });
    }

    $scope.masPrioridad = function(tarea){
      if (tarea.prioridad !== 2)
        tarea.prioridad +=1;
    }

    $scope.menosPrioridad = function(tarea){
      if (tarea.prioridad !== 0)
        tarea.prioridad -=1
    }

    $scope.eliminar = function(tarea){
      var indice = $scope.tareas.indexOf(tarea);
      $scope.tareas.splice(indice, 1);
    }
  }]);
