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
  .factory('comun', ['$http',function($http){
    var comun = {};

    comun.tareas = [];

    /** fixtures
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
    ];**/

    // Variable que voy a pasar entre vistas
    comun.tarea = {};

    /** Metodos remotos **/

    // GET - Cogemos todas las tareas del server
    comun.getAll = function(){
      return $http.get('/tareas')
      // tareas = data
        .success(function(tareas){
          // actualizo local
          angular.copy(tareas, comun.tareas);
          return comun.tareas;
        }).error(function() {
          /* Act on the event */
        });;
    };

    // POST - Enviamos tarea al server
    comun.add = function(tarea){
      // tarea de return es data
      return $http.post('/tarea', tarea)
        .success(function(tarea){
            // actualizo local
            comun.tareas.push(tarea);
        }).error(function() {
          /* Act on the event */
        });
    };


    // PUT - Eliminamos tarea del server
    comun.update = function(tarea){
      // tarea de return es data
      console.log(tarea);
      return $http.put('/tarea/'+tarea._id, tarea)
        .success(function(data){
          // Busco la tarea en el local
          var indice = comun.tareas.indexOf(tarea);
          // Actualizo las locales
          comun.tareas[indice] = data;

        }).error(function() {
          /* Act on the event */
          console.log('error');
        });
    };



    // DELETE - Eliminamos tarea del server
    comun.delete = function(tarea){
      // tarea de return es data
      return $http.delete('/tarea/'+ tarea._id)
        .success(function(){
            // actualizo local
            var indice = comun.tareas.indexOf(tarea);
            comun.tareas.splice(indice, 1);
        }).error(function() {
          /* Act on the event */
        });
    };


    return comun;

  }])
  .controller('ctrlAlta',['$scope','comun','$state',function($scope,comun,$state){

    // Actualizo los datos en local
    comun.getAll();

    // Datos de la vista
    $scope.tarea= {};
    // Ponemos tareas en comun
    $scope.tareas = comun.tareas;
    $scope.prioridades = ['Baja', 'Media', 'Alta']



    $scope.agregar = function(){
      comun.add({
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
      comun.delete(tarea);
    }

    $scope.procesarObjeto = function(tarea){
      comun.tarea = tarea;
      $state.go('editar');
    }

  }])
  .controller('ctrlEditar',['$scope','comun','$state',function($scope,comun,$state){
    $scope.tarea = comun.tarea;

    $scope.actualizar = function(){
      comun.update($scope.tarea);
      $state.go('alta');
    }

    $scope.eliminar = function(){
      comun.delete($scope.tarea);
      $state.go('alta');
    }


  }]);
