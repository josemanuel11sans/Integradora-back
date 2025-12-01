const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

class Carreras extends Model {}

Carreras.init(
  {
    id_carrera: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_carrera: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: { args: [2, 100], msg: "El nombre de la carrera debe tener entre 2 y 100 caracteres" }
      }
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    sequelize,
    modelName: 'Carrera',   // nombre interno en Sequelize
    tableName: 'carreras',  // nombre real en DB
    timestamps: true
  }
);

module.exports = Carreras;