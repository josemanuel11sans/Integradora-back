const Asesoria = require('./Asesorias/asesorias.model');
const Carrera = require('./Carreras/carreras.model');
const Usuario = require('./Usuarios/usuarios.model');

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


module.exports = { Asesoria, Carrera, Usuario};
