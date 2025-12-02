const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

class Espacio extends Model {}

Espacio.init(
  {
    id_espacio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "El nombre no puede estar vacío" },
        len: {
          args: [3, 100],
          msg: "El nombre debe tener entre 3 y 100 caracteres",
        },
      },
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: {
          args: [0, 500],
          msg: "La descripción no puede exceder 500 caracteres",
        },
      },
    },
    portada: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: { msg: "La portada debe ser una URL válida" },
      },
    },
    tutor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "usuarios",
        key: "id_usuario",
      },
    },
    materia_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "materias", // nombre de la tabla de materias
        key: "id_materia",
      },
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "Espacio",
    tableName: "espacios",
    timestamps: true,
  }
);

module.exports = Espacio;
