const express = require("express");
const router = express.Router();
const controller = require("./alumnoEspacio.controller");



const authenticate = require("../auth/middlewares/authenticate");
const authorizeRoles = require("../auth/middlewares/authorizeRoles");

// Inscribir alumno
router.post(
  "/:espacioId/alumnos/:alumnoId",
  controller.inscribir
);

// Desinscribir alumno
router.delete(
  "/:espacioId/alumnos/:alumnoId",
  controller.desinscribir
);

// Listar alumnos del espacio
router.get(
  "/:espacioId/alumnos",
  controller.alumnosDeEspacio
);

// Listar espacios del alumno
router.get(
  "/alumno/:alumnoId",

  controller.espaciosDeAlumno
);


router.get(
  "/alumno/:alumnoId/carrera",
  controller.getEspaciosPorCarreraDeAlumno
);


module.exports = router;
