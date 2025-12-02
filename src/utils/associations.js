const Usuario = require("../Usuarios/usuarios.model");
const File = require("../cloudinary/clud.model");
const Espacio = require("../Espacios/espacios.model");
const Asesoria = require('../Asesorias/asesorias.model');
const Carrera = require('../Carreras/carreras.model');
const Materia = require('../Materias/materias.model');
const TutorMateria = require('../TutorMaterias/tutorMaterias.model');


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

//Relación Materia 1 --- N Asesorías
Materia.hasMany(Asesoria, {
  foreignKey: 'materia_id',
  as: 'asesorias'
});

Asesoria.belongsTo(Materia, {
  foreignKey: 'materia_id',
  as: 'materia'
});

// MANY TO MANY Tutor <-> Materia
Usuario.belongsToMany(Materia, {
  through: TutorMateria,
  foreignKey: 'usuario_id',
  otherKey: 'materia_id',
  as: 'materias_impartidas'
});

Materia.belongsToMany(Usuario, {
  through: TutorMateria,
  foreignKey: 'materia_id',
  otherKey: 'usuario_id',
  as: 'tutores'
});


module.exports = { Usuario, File, Espacio, Asesoria, Carrera, Materia };