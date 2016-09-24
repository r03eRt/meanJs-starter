var mongoose = require('mongoose');

// definimos los datos del modelo
var TareasSchema = new mongoose.Schema({
  nombre: String,
  prioridad: Number
});

// Definimos el nombre del modelo a su schema
mongoose.model('Tareas', TareasSchema);
