const Usuario = require("../Usuarios/usuarios.model");
const Espacio = require("../espacios/espacios.model");
const AlumnoEspacio = require("./alumnoEspacio.model");

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

module.exports = {
  inscribirAlumno,
  desinscribirAlumno,
  getAlumnosDeEspacio,
  getEspaciosDeAlumno
};
