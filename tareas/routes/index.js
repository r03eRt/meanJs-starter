var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Add mongose to our rote and import models
var mongoose = require('mongoose');
// Modelo de la base de datos con los datos de las tareas
var Tareas = mongoose.model('Tareas');


// GET - Listar tareas
// delete http://url/tareas/
router.get('/tareas',function(req, res, next){
  console.log(req.body);
  Tareas.find(function(err, tareas){
    if(err)
      return next(err);
    res.json(tareas);
  })
});


// POST - añadir tareas
// post http://url/tarea/
router.post('/tarea',function(req, res, next){
  var tarea = new Tareas(req.body);
  tarea.save(function(err, tarea){
    if (err)
      return next(err);

    res.json(tarea);
  });
});


// PUT - Actualizar tarea
// put http://url/tarea/id_tarea
router.put('/tarea/:id',function(req, res){
    Tareas.findById(req.params.id, function(err, tarea){
      //tarea es la tarea local encontrada con la id que queremos
      tarea.nombre = req.body.nombre,
      tarea.prioridad = req.body.prioridad,
      tarea.save(function(err, tarea){
        if(err)
          return res.send(err);
        res.json(tarea);
      });
    })
});

// DELETE - Eliminar tarea tarea
// delete http://url/tarea/id_tarea
router.delete('/tarea/:id',function(req, res){

    Tareas.findByIdAndRemove(req.params.id, function(err){
        if(err)
          return res.send(err);
        res.json({message: 'Se ha eliminado la tarea con id: '+ req.params.id});
    })
});

module.exports = router;
