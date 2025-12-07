const express = require('express'); 
const router = express.Router(); 

const materiasController = require('./materias.controller'); 

const authenticate = require('../auth/middlewares/authenticate');
const authorizeRoles = require('../auth/middlewares/authorizeRoles');

// 1. Rutas con paths literales (no parámetros)
router.get('/active', materiasController.listActive);
router.get('/all', materiasController.list);
router.post('/create', materiasController.create);

// 2. Rutas con múltiples segmentos específicos
router.get('/carrera/:carreraId', materiasController.getByCarrera);

// 3. Rutas con paths específicos + parámetros
router.put('/update/:id', materiasController.update);  // ✅ ANTES de /:id
router.delete('/delete/:id', materiasController.remove);  // ✅ ANTES de /:id


// 4. Ruta genérica con solo parámetro (debe ir AL FINAL)
router.get('/:id', materiasController.getOne);  // ✅ AL FINAL

module.exports = router;