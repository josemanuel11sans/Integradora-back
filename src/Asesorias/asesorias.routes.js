const express = require('express'); 
// Importa Express
const router = express.Router(); 
// Crea un router de Express
const asesoriaController = require('./asesorias.controller'); 
// Importa el controlador de asesorias

const authenticate = require('../auth/middlewares/authenticate');
const authorizeRoles = require('../auth/middlewares/authorizeRoles');


// Crear una asesoria
router.post('/student/:estudiante_id/create', asesoriaController.create);

// Obtener todas las asesorias test
router.get('/', asesoriaController.getAll);

// Obtener asesorias por estudiante
router.get('/student/:estudiante_id', asesoriaController.getByStudent);

// Obtener asesorias por tutor
router.get('/tutor/:tutor_id', asesoriaController.getByTutor);

// Obtener asesorias por materia
router.get('/materia/:materia_id', asesoriaController.getByMateria);

// Obtener asesorias por carrera
router.get('/carrera/:carrera_id', asesoriaController.getByCarrera);

module.exports = router; 
// Exporta el router para usarlo en la app principal

/*
para dar acceso a las rutas de asesorias solo a asesorias autenticados y con roles específicos, se ha añadido el middleware de autenticación y autorización en las rutas correspondientes.
    authenticate: verifica que el asesoria esté autenticado (tenga un token JWT válido).
    authorizeRoles: verifica que el asesoria tenga uno de los roles permitidos para acceder a la ruta.
Estas protecciones se aplican a las rutas que manejan datos sensibles o acciones administrativas, como listar todos los asesorias o acceder a detalles específicos de un asesoria.
*/

