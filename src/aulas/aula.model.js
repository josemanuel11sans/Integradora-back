const { DataTypes, Model } = require("sequelize");
const {sequelize} = require("../config/db");
const Edificio = require("../Edificios/edificios.model");

class Aula extends Model {}

Aula.init({ 
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: { msg: "El nombre es obligatorio" },
      len: { args: [2, 100], msg: "El nombre debe tener entre 2 y 100 caracteres" }
    }
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  edificioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Edificios",
      key: "id"
    },
    validate: {
      notEmpty: { msg: "El edificio es obligatorio" },
      isInt: { msg: "edificioId debe ser un número entero" }
    }
  }
},{
    sequelize,
    modelName: "Aula",
    tableName: "aulas",
    timestamps: true
  });

Aula.belongsTo(Edificio, { foreignKey: "edificioId" });

module.exports = Aula;
