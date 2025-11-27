const express = require('express'); 
// Importa Express
const router = express.Router(); 
// Crea un router de Express

const materiasController = require('./materias.controller'); 
// Importa el controlador de materias

const authenticate = require('../auth/middlewares/authenticate');
const authorizeRoles = require('../auth/middlewares/authorizeRoles');

//crear una materia
router.post('/create', materiasController.create);

//obtener todas las materias
router.get('/', materiasController.list);

//obtener una materia por id
router.get('/:id', materiasController.getOne);

//actualizar una materia por id
router.put('/:id', materiasController.update);

//eliminar una materia por id
router.delete('/:id', materiasController.remove);

//obtener materias por carrera id
router.get('/carrera/:carreraId', materiasController.getByCarrera);

module.exports = router;