const express = require('express'); 
// Importa Express
const router = express.Router(); 
// Crea un router de Express
const usuarioController = require('./usuarios.controller'); 
// Importa el controlador de usuarios

const authenticate = require('../auth/middlewares/authenticate');
const authorizeRoles = require('../auth/middlewares/authorizeRoles');


router.get('/usuarios/all',authenticate, authorizeRoles('admin','coordinador'), usuarioController.list); 
// Ruta GET para obtener todos los usuarios
router.get('/usuarios/id/:id',authenticate,authorizeRoles('coordinador'), usuarioController.getOne); 
// Ruta GET para obtener un usuario por id
router.post('/usuarios/create', usuarioController.create); 
// Ruta POST para crear un nuevo usuario
router.put('/usuarios/update/:id', usuarioController.update); 
// Ruta PUT para actualizar un usuario por id
router.delete('/usuarios/delete/:id', usuarioController.remove); 
// Ruta DELETE para eliminar un usuario por id

module.exports = router; 
// Exporta el router para usarlo en la app principal

/*
para dar acceso a las rutas de usuarios solo a usuarios autenticados y con roles específicos, se ha añadido el middleware de autenticación y autorización en las rutas correspondientes.
    authenticate: verifica que el usuario esté autenticado (tenga un token JWT válido).
    authorizeRoles: verifica que el usuario tenga uno de los roles permitidos para acceder a la ruta.
Estas protecciones se aplican a las rutas que manejan datos sensibles o acciones administrativas, como listar todos los usuarios o acceder a detalles específicos de un usuario.
*/