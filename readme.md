#INSTALLATION

``express --ej tareas`` --> Crear projecto e expressJs --> usamos html para el render

``cd project folder npm install`` --> Install dependecies of project

``npm install mongoose --save`` --> For install mongoose dara object model manager

``mkdir models`` --> Folder with all models used

``npm start`` --> For start the webserver on port 3000

``brew services start mongodb`` --> Start service of mongodb

``mongo``

### 1.- Create routes with ui-router

### 2.- Create views

### 3.- Create logic and navigation

### 4.- Integrate front in Express framework

- Move angular file (appAngular.js) and libs to ``project/public/javascripts``
- Move angular stylesheets to ``project/public/stylesheets``
- Move views to ``project/public/views``
- Go to ``project/views`` and replace ``index.ejs`` for ``index.html`` (after change extension to .ejs)
- ``npm start`` into project folder
- Go to browser to ``http://localhost:3000``

### 5.- Define models with mongoose

- Create a model in models in ``project/models``
- Add a new file :

``var mongoose = require('mongoose');``

``// definimos los datos del modelo``
``var tareaSchema = new mongoose.Schema({``
``  nombre: String,``
``  prioridad: Number``
``});``

``// Definimos el nombre del modelo a su schema``
``mongoose.model('Tarea', tareaSchema);``

- Include the conection and model in main configuration file of Express (``project/app.js``)

``// if not db mongodb creates it``
``var mongoose = require('mongoose');``

``require('./models/Tareas');``

``mongoose.connect('mongodb://localhost/tareas');``

### 6.- API REST schema

#### API REST
GET /model
POST /model
PUT DELETE /model

localhost:3000/model
#### CRUD
CREATE 
RETRIEVE 
UPDATE 
DELETE 
