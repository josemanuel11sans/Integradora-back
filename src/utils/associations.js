const Usuario = require("../Usuarios/usuarios.model");
const File = require("../cloudinary/clud.model");
const Espacio = require("../Espacios/espacios.model");
const Asesoria = require('../Asesorias/asesorias.model');
const Carrera = require('../Carreras/carreras.model');
const Materia = require('../materias/materias.model');


// Relación Usuario - File
Usuario.hasMany(File, {
  foreignKey: "usuarioId",
  as: "archivos",
});

File.belongsTo(Usuario, {
  foreignKey: "usuarioId",
  as: "usuario",
});

Usuario.hasMany(Espacio, {
  foreignKey: "tutor_id",
  as: "espacios",
});

Espacio.belongsTo(Usuario, {
  foreignKey: "tutor_id",
  as: "tutor",
});

// Carrera 1 ---< N Asesorías
Carrera.hasMany(Asesoria, {
  foreignKey: 'carrera_id',
  as: 'asesorias'
});

Asesoria.belongsTo(Carrera, {
  foreignKey: 'carrera_id',
  as: 'carrera'
});


// Tutor 1 ---< N Asesorías
Usuario.hasMany(Asesoria, {
  foreignKey: 'tutor_id',
  as: 'asesorias_tutor'
});

Asesoria.belongsTo(Usuario, {
  foreignKey: 'tutor_id',
  as: 'tutor'
});

// Usuario (Estudiante) 1 ---< N Asesorías
Usuario.hasMany(Asesoria, {
  foreignKey: 'estudiante_id',
  as: 'asesorias_estudiante'
});

Asesoria.belongsTo(Usuario, {
  foreignKey: 'estudiante_id',
  as: 'estudiante'
});

//Relación Carrera 1 --- N Materias
Carrera.hasMany(Materia, {
  foreignKey: 'carrera_id',
  as: 'materias'
});

Materia.belongsTo(Carrera, {
  foreignKey: 'carrera_id',
  as: 'carrera'
});

module.exports = { Usuario, File, Espacio, Asesoria, Carrera, Materia };