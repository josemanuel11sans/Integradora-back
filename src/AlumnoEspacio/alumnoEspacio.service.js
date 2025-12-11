const Usuario = require("../Usuarios/usuarios.model");
const Espacio = require("../espacios/espacios.model");
const AlumnoEspacio = require("./alumnoEspacio.model");
const Materia = require('../materias/materias.model');
const Carrera = require('../Carreras/carreras.model');

// Inscribir alumno en espacio
const inscribirAlumno = async (alumnoId, espacioId) => {
  return await AlumnoEspacio.findOrCreate({
    where: { alumno_id: alumnoId, espacio_id: espacioId },
    defaults: { estado: true }
  });
};

// Quitar alumno de espacio
const desinscribirAlumno = async (alumnoId, espacioId) => {
  const registro = await AlumnoEspacio.findOne({
    where: { alumno_id: alumnoId, espacio_id: espacioId }
  });

  if (!registro) return null;

  await registro.destroy();
  return registro;
};

// Obtener alumnos inscritos
const getAlumnosDeEspacio = async (espacioId) => {
  return await Usuario.findAll({
    include: [
      {
        model: Espacio,
        as: "espacios_inscritos",
        where: { id_espacio: espacioId },
        attributes: [],
        through: { attributes: [] }
      }
    ],
    where: { estado: true, role: "student" },
    attributes: ["id_usuario", "nombre", "apellido", "email"]
  });
};

// Obtener espacios del alumno (ya lo tenías)
const getEspaciosDeAlumno = async (alumnoId) => {
  return await Espacio.findAll({
    include: [
      {
        model: Usuario,
        as: "alumnos",
        where: { id_usuario: alumnoId },
        attributes: [],
        through: { attributes: [] }
      }
    ],
    where: { estado: true },
    order: [["createdAt", "DESC"]]
  });
};

const getEspaciosPorCarreraDeAlumno = async (alumnoId) => {
  // Obtener alumno
  const alumno = await Usuario.findByPk(alumnoId);

  if (!alumno) {
    throw new Error("Alumno no encontrado");
  }

  if (alumno.role !== "student") {
    throw new Error("El usuario no es alumno");
  }

  if (!alumno.carrera_id) {
    throw new Error("El alumno no tiene carrera asignada");
  }

  // Buscar espacios cuya materia pertenezca a la MISMA carrera del alumno
  return await Espacio.findAll({
    where: { estado: true },
    include: [
      {
        model: Materia,
        as: "materia",
        required: true,
        where: { carrera_id: alumno.carrera_id },
        attributes: ["id_materia", "nombre_materia", "carrera_id"]
      },
      {
        model: Usuario,
        as: "tutor",
        attributes: ["id_usuario", "nombre", "apellido", "email"]
      }
    ],
    order: [["createdAt", "DESC"]]
  });
};

module.exports = {
  inscribirAlumno,
  desinscribirAlumno,
  getAlumnosDeEspacio,
  getEspaciosDeAlumno,
  getEspaciosPorCarreraDeAlumno,
};
