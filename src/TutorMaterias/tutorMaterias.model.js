const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

class TutorMateria extends Model {}

TutorMateria.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    materia_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'TutorMateria',
    tableName: 'tutor_materias',
    timestamps: true
  }
);

module.exports = TutorMateria;