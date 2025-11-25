const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints para la gestión de autenticación
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     description: Permite iniciar sesión con correo y contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@correo.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Regresa el token y la información del usuario.
 *       401:
 *         description: Credenciales inválidas.
 */
router.post("/auth/login", authController.login);

module.exports = router;
