const express = require('express'); 
// Importa Express
const router = express.Router(); 
// Crea un router de Express

const tutorMateriasController = require('./tutorMaterias.controller'); 
// Importa el controlador de tutor-materias

const authenticate = require('../auth/middlewares/authenticate');
const authorizeRoles = require('../auth/middlewares/authorizeRoles');


// Asignar materia a tutor
router.post('/tutores/:id/materias',authenticate,authorizeRoles('coordinator', 'tutor'),tutorMateriasController.asignar);

// Quitar materia
router.delete('/tutores/:id/materias/:materiaId',authenticate,authorizeRoles('coordinator', 'tutor'),tutorMateriasController.quitar);

// Listar materias de un tutor
router.get('/tutores/:id/materias',authenticate,authorizeRoles('tutor', 'coordinator'), tutorMateriasController.materiasDeTutor);

// Listar tutores de una materia
router.get('/materias/:id/tutores',authenticate,authorizeRoles('coordinator', 'tutor'),tutorMateriasController.tutoresDeMateria);

module.exports = router;
