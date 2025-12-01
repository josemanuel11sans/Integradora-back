const express = require('express'); 
// Importa Express
const router = express.Router(); 
// Crea un router de Express
const usuarioController = require('./usuarios.controller'); 
// Importa el controlador de usuarios

const authenticate = require('../auth/middlewares/authenticate');
const authorizeRoles = require('../auth/middlewares/authorizeRoles');

///ducumetacion 
/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Endpoints para gestionar usuarios
 */


/**
 * @swagger
 * /api/usuarios/all:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     description: Retorna la lista completa de usuarios. Solo accesible por admin y coordinador.
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida con éxito.
 *       401:
 *         description: No autenticado.
 *       403:
 *         description: No autorizado.
 */
router.get('/usuarios/all',authenticate, authorizeRoles('admin','coordinator'), usuarioController.list); 
// Ruta GET para obtener todos los usuarios

/**
 * @swagger
 * /api/usuarios/id/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 */
router.get('/usuarios/id/:id',authenticate,authorizeRoles('coordinador'), usuarioController.getOne); 
// Ruta GET para obtener un usuario por id

/**
 * @swagger
 * /api/usuarios/create:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               correo:
 *                 type: string
 *               password:
 *                 type: string
 *               rol:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       400:
 *         description: Datos inválidos
 */
router.post('/usuarios/create', usuarioController.create); 
// Ruta POST para crear un nuevo usuario

/**
 * @swagger
 * /api/usuarios/update/{id}:
 *   put:
 *     summary: Actualizar un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               correo:
 *                 type: string
 *               rol:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */
router.put('/usuarios/update/:id', usuarioController.update); 
// Ruta PUT para actualizar un usuario por id

/**
 * @swagger
 * /api/usuarios/delete/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 */
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