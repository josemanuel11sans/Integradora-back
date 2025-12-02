const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");
const passwordResetController = require("./passwordReset/passwordReset.controller");
const {
  requestReset,
  confirmReset
} = require("./passwordReset/passwordReset.controller");

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
// tuta para logue con google
router.post("/auth/google", authController.loginGoogle);

// 1. Solicitar correo
router.post("/request-reset", passwordResetController.requestReset);
// 2. Confirmar nueva contraseña
router.post("/auth/password/verify-code", passwordResetController.verifyCode);
// 3.- Resetear contraseña
router.post("/auth/password/reset", passwordResetController.resetPassword);

module.exports = router;

// guia para consumir desde el front
// en el front se optiene un token de google usando
// - Gogle indetity Service (nuevo)
// - O bien el Gogle Oaut Clasico
// google.accounts.id.initialize({
//   client_id: "TU_CLIENT_ID",
//   callback: handleCredentialResponse,
// });

// google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
//   theme: "outline",
//   size: "large",
// });
// Cuando gogle devuelva el token
// async function handleCredentialResponse(response) {
//   const tokenGoogle = response.credential;

//   const backend = await fetch("/api/auth/google", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ token: tokenGoogle }),
//   });

//   const data = await backend.json();
//   console.log(data);
// }
// 👉 https://developers.google.com/oauthplayground