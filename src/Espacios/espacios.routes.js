const express = require('express');
const router = express.Router();
const espaciosController = require('./espacios.controller');

const authenticate = require('../auth/middlewares/authenticate');
const authorizeRoles = require('../auth/middlewares/authorizeRoles');

/**
 * @swagger
 * tags:
 *   name: Espacios
 *   description: Endpoints para gestionar espacios de tutoría
 */

/**
 * @swagger
 * /api/espacios/all:
 *   get:
 *     summary: Obtener todos los espacios
 *     tags: [Espacios]
 *     security:
 *       - bearerAuth: []
 *     description: Retorna la lista completa de espacios activos.
 *     responses:
 *       200:
 *         description: Lista de espacios obtenida con éxito
 *       401:
 *         description: No autenticado
 */
router.get('/all', authenticate, espaciosController.list);

/**
 * @swagger
 * /api/espacios/tutor/{tutorId}:
 *   get:
 *     summary: Obtener espacios de un tutor específico
 *     tags: [Espacios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tutorId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tutor
 *     responses:
 *       200:
 *         description: Espacios del tutor obtenidos con éxito
 *       401:
 *         description: No autenticado
 */
router.get(
  '/tutor/:tutorId',
  authenticate,
  authorizeRoles('tutor', 'coordinator', 'admin'),
  espaciosController.listByTutor
);

/**
 * @swagger
 * /api/espacios/search:
 *   get:
 *     summary: Buscar espacios por nombre
 *     tags: [Espacios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: nombre
 *         required: true
 *         schema:
 *           type: string
 *         description: Término de búsqueda
 *     responses:
 *       200:
 *         description: Resultados de búsqueda
 *       400:
 *         description: Parámetro de búsqueda requerido
 *       401:
 *         description: No autenticado
 */
router.get('/search', authenticate, espaciosController.search);

/**
 * @swagger
 * /api/espacios/id/{id}:
 *   get:
 *     summary: Obtener un espacio por ID
 *     tags: [Espacios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del espacio
 *     responses:
 *       200:
 *         description: Espacio encontrado
 *       404:
 *         description: Espacio no encontrado
 *       401:
 *         description: No autenticado
 */
router.get('/id/:id', authenticate, espaciosController.getOne);

/**
 * @swagger
 * /api/espacios/create:
 *   post:
 *     summary: Crear un nuevo espacio
 *     tags: [Espacios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - tutor_id
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del espacio
 *               descripcion:
 *                 type: string
 *                 description: Descripción del espacio
 *               portada:
 *                 type: string
 *                 description: URL de la imagen de portada
 *               tutor_id:
 *                 type: integer
 *                 description: ID del tutor que crea el espacio
 *     responses:
 *       201:
 *         description: Espacio creado correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 */
router.post(
  '/create',
  authenticate,
  authorizeRoles('tutor', 'admin', 'coordinator'),
  espaciosController.create
);

/**
 * @swagger
 * /api/espacios/update/{id}:
 *   put:
 *     summary: Actualizar un espacio
 *     tags: [Espacios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del espacio a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               portada:
 *                 type: string
 *     responses:
 *       200:
 *         description: Espacio actualizado exitosamente
 *       404:
 *         description: Espacio no encontrado
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 */
router.put(
  '/update/:id',
  authenticate,
  authorizeRoles('tutor', 'coordinator'),
  espaciosController.update
);

/**
 * @swagger
 * /api/espacios/delete/{id}:
 *   delete:
 *     summary: Eliminar un espacio por ID
 *     tags: [Espacios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del espacio a eliminar
 *     responses:
 *       200:
 *         description: Espacio eliminado correctamente
 *       404:
 *         description: Espacio no encontrado
 *       409:
 *         description: El espacio tiene reservas o materiales asociados
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 */
router.delete(
  '/delete/:id',
  authenticate,
  authorizeRoles('tutor', 'coordinator'),
  espaciosController.remove
);

// Obtener espacios por materia
router.get(
  '/materia/:materiaId',
  authenticate,
  authorizeRoles('student','tutor','coordinator','admin'),
  espaciosController.listByMateria
);



module.exports = router;