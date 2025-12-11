const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

class AlumnoEspacio extends Model {}

AlumnoEspacio.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    alumno_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "usuarios",      // tabla usuarios
        key: "id_usuario",
      },
    },
    espacio_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "espacios",      // tabla espacios
        key: "id_espacio",
      },
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,       // por si quieres manejar baja lógica de la inscripción
    },
  },
  {
    sequelize,
    modelName: "AlumnoEspacio",
    tableName: "alumno_espacio",
    timestamps: true,
  }
);

module.exports = AlumnoEspacio;
