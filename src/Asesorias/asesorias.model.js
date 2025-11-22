/*
Asesorías
    Estudiante
        **Registrar el motivo de la asesoría al reservar.
        ** Registrar de que materia, con que profesor y en que espacio se realizará la asesoría.
        **Ver historial de asesorías realizadas.
    Tutor académico
        **Registrar notas/comentarios de la asesoría.
        **Marcar asistencia de estudiante.
    Coordinador
        **Supervisar calidad y frecuencia de asesorías.
*/

const { Model, DataTypes } = require('sequelize'); 
// Importa la clase Model y tipos de datos de Sequelize
const { sequelize } = require('../config/db'); 
// Importa la instancia de Sequelize ya configurada

class Asesorias extends Model {} 
// Define la clase Usuario que hereda de Model

Asesorias.init({
  id_asesoria: {
    type: DataTypes.INTEGER, // Tipo entero
    primaryKey: true, // Clave primaria
    autoIncrement: true // Se incrementa automáticamente
  },
  comentarios: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: { args: [2, 500], msg: "El motivo puede tener entre 2 y 500 caracteres" }
    }
  },
  espacio_id:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  estudiante_id:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tutor_id:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha_asesoria:{
    type: DataTypes.DATE,
    allowNull: false
  },
  asistencia:{
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  carrera_id: {
    type: DataTypes.INTEGER, // FK opcional si coordinador pertenece a una carrera
    allowNull: true
  },
}, {
  sequelize, // Conecta con la instancia de Sequelize
  modelName: 'Asesoria', // Nombre del modelo
  tableName: 'asesorias', // Nombre de la tabla en la DB
  timestamps: true // Genera createdAt/updatedAt automáticamente
});

module.exports = Asesorias; 
// Exporta el modelo 
