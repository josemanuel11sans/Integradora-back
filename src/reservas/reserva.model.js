
/*
📅 Reservas
    Estudiante
        **Buscar tutores disponibles por fecha y hora.
        **Reservar asesoría con un tutor.
        **Cancelar/modificar reservas.
    Tutor académico
        **Aprobar o rechazar reservas.
        **Gestionar disponibilidad de horarios.
    Coordinador
        **Visualizar las reservas de estudiantes y tutores bajo su supervisión.
*/

const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

class Reserva extends Model {}

Reserva.init(
  {
    id_reserva: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha_reserva: {
      // fecha en la que el alumno asistirá
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    asistio: {
      // si fue o no a la asesoría
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    usuario_id: {
      // FK hacia el usuario
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "usuarios",
        key: "id_usuario",
      },
    },
  },
  {
    sequelize,
    modelName: "Reserva",
    tableName: "reservas",
    timestamps: true,
  }
);

module.exports = Reserva;
