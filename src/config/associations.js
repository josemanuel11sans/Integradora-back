const Usuario = require("../Usuarios/usuarios.model");
const Carrera = require("../Carreras/carreras.model");
const Reserva = require("../reservas/reserva.model");
const Edificio = require("../Edificios/edificios.model");
const Aula = require("../aulas/aula.model");
const Cloudinary = require("../cloudinary/clud.model");
const Espacio = require("../Espacios/espacios.model");
// Relaciones

// Usuario -> Carrera

// un suario solo de tipo student puede pertenecer a una carrera
Usuario.belongsTo(Carrera, { foreignKey: "carrera_id", as: "carrera" });
Carrera.hasMany(Usuario, { foreignKey: "carrera_id", as: "estudiantes" });

// Usuario -> Carrera
// un Alumno puede gennerar una reserva
Usuario.hasMany(Reserva, {foreignKey: "usuario_id",as: "reservas",});
Reserva.belongsTo(Usuario, {foreignKey: "usuario_id",as: "usuario",});

// Un Edificio tiene muchas Aulas
Edificio.hasMany(Aula, { foreignKey: "edificioId" });
Aula.belongsTo(Edificio, { foreignKey: "edificioId" });

// Un Espacio tiene muchos Cloudinary (archivos)
Espacio.hasMany(Cloudinary, { foreignKey: "espacioId", as: "archivos" });
Cloudinary.belongsTo(Espacio, { foreignKey: "espacioId", as: "espacio" });


module.exports = {
  Usuario,
  Carrera,
  Reserva,
  Edificio,
  Aula,
  Cloudinary,
  Espacio,
};
