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
      controller: 'ctrlEditar'
    });
    $urlRouterProvider.otherwise('alta');
  })
  .factory('comun', [function(){
    var comun = {};
    comun.tareas = [
      {
      nombre: 'Comprar comida1',
      prioridad: '1'
      },
      {
      nombre: 'Comprar comida2',
      prioridad: '2'
      },
      {
      nombre: 'Comprar comida3',
      prioridad: '0'
      }
    ];

    // Variable que voy a pasar entre vistas
    comun.tarea = {};

    comun.eliminar = function(tarea){
      var indice = comun.tareas.indexOf(tarea);
      comun.tareas.splice(indice, 1);
    }

    return comun;

  }])
  .controller('ctrlAlta',['$scope','comun','$state',function($scope,comun,$state){
    $scope.tarea= {};
    //$scope.tareas = [];
    $scope.tareas = comun.tareas;
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
      comun.eliminar(tarea);
    }

    $scope.procesarObjeto = function(tarea){
      comun.tarea = tarea;
      $state.go('editar');
    }

  }])
  .controller('ctrlEditar',['$scope','comun','$state',function($scope,comun,$state){
    $scope.tarea = comun.tarea;

    $scope.actualizar = function(){
      var indice = comun.tareas.indexOf(comun.tarea);
      comun.tareas[indice] = $scope.tarea;
      $state.go('alta');
    }

    $scope.eliminar = function(){
      comun.eliminar($scope.tarea);
      $state.go('alta');
    }


  }]);
