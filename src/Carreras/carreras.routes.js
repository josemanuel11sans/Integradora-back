const express = require('express'); 
// Importa Express
const router = express.Router(); 
// Crea un router de Express
const carreraController = require('./carreras.controller'); 
// Importa el controlador de carreras

const authenticate = require('../auth/middlewares/authenticate');
const authorizeRoles = require('../auth/middlewares/authorizeRoles');

//crear una carrera
router.post('/create', carreraController.create);

//obtener todas las carreras
router.get('/', carreraController.list);

//obtener una carrera por id
router.get('/:id', carreraController.getOne);

//actualizar una carrera por id
router.put('/:id', carreraController.update);

//eliminar una carrera por id
router.delete('/:id', carreraController.remove);

module.exports = router;