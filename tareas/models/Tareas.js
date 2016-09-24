var mongoose = require('mongoose');

// definimos los datos del modelo
var tareasSchema = new mongoose.Schema({
  nombre: String,
  prioridad: Number
});

// Definimos el nombre del modelo a su schema
mongoose.model('Tareas', tareasSchema);
