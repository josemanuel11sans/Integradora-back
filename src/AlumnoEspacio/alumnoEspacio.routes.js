const express = require("express");
const router = express.Router();
const controller = require("./alumnoEspacio.controller");

const authenticate = require("../auth/middlewares/authenticate");
const authorizeRoles = require("../auth/middlewares/authorizeRoles");

// Inscribir alumno
router.post(
  "/:espacioId/alumnos/:alumnoId",
  authenticate,
  authorizeRoles("student", "coordinator", "admin"),
  controller.inscribir
);

// Desinscribir alumno
router.delete(
  "/:espacioId/alumnos/:alumnoId",
  authenticate,
  authorizeRoles("student", "coordinator", "admin"),
  controller.desinscribir
);

// Listar alumnos del espacio
router.get(
  "/:espacioId/alumnos",
  authenticate,
  authorizeRoles("tutor", "coordinator", "admin"),
  controller.alumnosDeEspacio
);

// Listar espacios del alumno
router.get(
  "/alumno/:alumnoId",
  authenticate,
  authorizeRoles("student", "tutor", "coordinator", "admin"),
  controller.espaciosDeAlumno
);

module.exports = router;
