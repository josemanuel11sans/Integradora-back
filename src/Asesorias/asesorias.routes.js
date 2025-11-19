const express = require('express'); 
// Importa Express
const router = express.Router(); 
// Crea un router de Express
const asesoriaController = require('./asesorias.controller'); 
// Importa el controlador de asesorias

const authenticate = require('../auth/middlewares/authenticate');
const authorizeRoles = require('../auth/middlewares/authorizeRoles');

///ducumetacion 
/**
 * @swagger
 * tags:
 *   name: asesorias
 *   description: Endpoints para gestionar asesorias
 */


/**
 * @swagger
 * /api/asesorias/all:
 *   get:
 *     summary: Obtener todos los asesorias
 *     tags: [asesorias]
 *     security:
 *       - bearerAuth: []
 *     description: Retorna la lista completa de asesorias. Solo accesible por admin y coordinador.
 *     responses:
 *       200:
 *         description: Lista de asesorias obtenida con éxito.
 *       401:
 *         description: No autenticado.
 *       403:
 *         description: No autorizado.
 */
router.get('/asesorias/all',authenticate, authorizeRoles('admin','coordinador'), asesoriaController.list); 
// Ruta GET para obtener todos los asesorias

/**
 * @swagger
 * /api/asesorias/id/{id}:
 *   get:
 *     summary: Obtener un asesoria por ID
 *     tags: [asesorias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del asesoria
 *     responses:
 *       200:
 *         description: asesoria encontrado
 *       404:
 *         description: asesoria no encontrado
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 */
router.get('/asesorias/id/:id',authenticate,authorizeRoles('coordinador'), asesoriaController.getOne); 
// Ruta GET para obtener un asesoria por id

/**
 * @swagger
 * /api/asesorias/create:
 *   post:
 *     summary: Crear un nuevo asesoria
 *     tags: [asesorias]
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
 *         description: asesoria creado correctamente
 *       400:
 *         description: Datos inválidos
 */
router.post('/asesorias/create', asesoriaController.create); 
// Ruta POST para crear un nuevo asesoria

/**
 * @swagger
 * /api/asesorias/update/{id}:
 *   put:
 *     summary: Actualizar un asesoria
 *     tags: [asesorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del asesoria a actualizar
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
 *         description: asesoria actualizado exitosamente
 *       404:
 *         description: asesoria no encontrado
 */
router.put('/asesorias/update/:id', asesoriaController.update); 
// Ruta PUT para actualizar un asesoria por id

/**
 * @swagger
 * /api/asesorias/delete/{id}:
 *   delete:
 *     summary: Eliminar un asesoria por ID
 *     tags: [asesorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: asesoria eliminado correctamente
 *       404:
 *         description: asesoria no encontrado
 */
router.delete('/asesorias/delete/:id', asesoriaController.remove); 
// Ruta DELETE para eliminar un asesoria por id

// Consultas especificas
// ------------Estudiante-------------

// Crear una asesoria
router.post('/student/:estudiante_id/create', asesoriaController.createAsesoriaByStudent);

// Obtener asesorias por estudiante
router.get('/student/:estudiante_id', asesoriaController.getAsesoriasByStudent);

module.exports = router; 
// Exporta el router para usarlo en la app principal

/*
para dar acceso a las rutas de asesorias solo a asesorias autenticados y con roles específicos, se ha añadido el middleware de autenticación y autorización en las rutas correspondientes.
    authenticate: verifica que el asesoria esté autenticado (tenga un token JWT válido).
    authorizeRoles: verifica que el asesoria tenga uno de los roles permitidos para acceder a la ruta.
Estas protecciones se aplican a las rutas que manejan datos sensibles o acciones administrativas, como listar todos los asesorias o acceder a detalles específicos de un asesoria.
*/

