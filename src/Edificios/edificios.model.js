const { DataTypes, Model } = require("sequelize");
const {sequelize} = require("../config/db");

class Edificio extends Model {}
// modelo de base de datos usando sequialice como orm 
Edificio.init(
  {
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: "El nombre es obligatorio" },
        len: {
          args: [3, 100],
          msg: "El nombre debe tener entre 3 y 100 caracteres",
        },
      },
    },
    ubicacion: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: { msg: "La ubicación es obligatoria" },
      },
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "Edificio",
    tableName: "edificios",
    timestamps: true,
  }
);

module.exports = Edificio;
