const express = require('express'); 
const router = express.Router(); 

const materiasController = require('./materias.controller'); 

const authenticate = require('../auth/middlewares/authenticate');
const authorizeRoles = require('../auth/middlewares/authorizeRoles');

// RUTAS ESPECÍFICAS PRIMERO (antes de las rutas con parámetros)

// Crear una materia
router.post('/create', materiasController.create);

// Obtener materias por carrera id (ESPECÍFICA - debe ir antes de /:id)
router.get('/carrera/:carreraId', materiasController.getByCarrera);

// Obtener todas las materias
router.get('/all', materiasController.list);

// RUTAS CON PARÁMETROS DINÁMICOS AL FINAL

// Obtener una materia por id
router.get('/:id', materiasController.getOne);

// Actualizar una materia por id
router.put('/update/:id', materiasController.update);

// Eliminar una materia por id
router.delete('/delete/:id', materiasController.remove);

module.exports = router;