const express = require('express');
const router = express.Router();
const carreraController = require('./carreras.controller');

const authenticate = require('../auth/middlewares/authenticate');
const authorizeRoles = require('../auth/middlewares/authorizeRoles');

// Crear carrera
router.post('/create', carreraController.create);

// Obtener todas las carreras
router.get('/', carreraController.list);

// Actualizar carrera por id
router.put('/update/:id', carreraController.update);

// Eliminar/toggle carrera por id (coincide con front: /delete/:id)
router.delete('/delete/:id', carreraController.remove);

// Obtener una carrera por id
router.get('/:id', carreraController.getOne);

module.exports = router;