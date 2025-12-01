const Usuario = require("../Usuarios/usuarios.model");
const Carrera = require("../Carreras/carreras.model");
const Reserva = require("../reservas/reserva.model");
// Relaciones

// Usuario -> Carrera

// un suario solo de tipo student puede pertenecer a una carrera
Usuario.belongsTo(Carrera, { foreignKey: "carrera_id", as: "carrera" });
Carrera.hasMany(Usuario, { foreignKey: "carrera_id", as: "estudiantes" });

// Usuario -> Carrera
// un Alumno puede gennerar una reserva
Usuario.hasMany(Reserva, {foreignKey: "usuario_id",as: "reservas",});
Reserva.belongsTo(Usuario, {foreignKey: "usuario_id",as: "usuario",});

module.exports = {
  Usuario,
  Carrera,
  Reserva,
};
