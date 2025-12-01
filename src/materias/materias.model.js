const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

class Materias extends Model {}

Materias.init(
  {
    id_materia: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_materia: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: { args: [2, 100], msg: "El nombre de la materia debe tener entre 2 y 100 caracteres" }
      }
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    carrera_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Materia',   // nombre interno en Sequelize
    tableName: 'materias',  // nombre real en DB
    timestamps: true
  }
);

module.exports = Materias;