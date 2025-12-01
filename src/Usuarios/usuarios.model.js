const { Model, DataTypes } = require('sequelize'); 
// Importa la clase Model y tipos de datos de Sequelize
const { sequelize } = require('../config/db'); 
// Importa la instancia de Sequelize ya configurada

class Usuario extends Model {} 
// Define la clase Usuario que hereda de Model

Usuario.init({
  id_usuario: {
    type: DataTypes.INTEGER, // Tipo entero
    primaryKey: true, // Clave primaria
    autoIncrement: true // Se incrementa automáticamente
  },
  nombre: {
    type: DataTypes.STRING, // Tipo texto
    allowNull: false, // No puede ser nulo
    validate: {
      notEmpty: { msg: "El nombre no puede estar vacío" }, // Validación: no vacío
      len: { args: [2, 100], msg: "El nombre debe tener entre 2 y 100 caracteres" } // Validación: longitud
    }
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "El apellido no puede estar vacío" },
      len: { args: [2, 100], msg: "El apellido debe tener entre 2 y 100 caracteres" }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    // unique: true,
    validate: { isEmail: true } // Validación de formato de correo
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true, // Puede ser nulo
    validate: {
      is: { args: /^[0-9()+-\s]*$/, msg: 'Teléfono inválido' }, // Solo números y símbolos permitidos
      len: { args: [7, 20], msg: "El teléfono debe tener entre 7 y 20 caracteres" } // Validación: longitud
    }
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true // Por defecto el usuario está activo
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false, 
    validate: {
      notEmpty: { msg: "La contraseña no puede estar vacía" },
      len: { args: [6, 100], msg: "La contraseña debe tener al menos 6 caracteres" }
    }
  },
  role:{
    type: DataTypes.ENUM('student','tutor','coordinator','admin'),
    defaultValue: 'student',
    allowNull: false
  },//carrera solo para el rol de student
  carrera_id: {
    type: DataTypes.INTEGER, // FK opcional si coordinador pertenece a una carrera
    allowNull: true,
     references: {
      model: 'carreras',
      key: 'id_carrera'
    }
  },
}, {
  sequelize, // Conecta con la instancia de Sequelize
  modelName: 'Usuario', // Nombre del modelo
  tableName: 'usuarios', // Nombre de la tabla en la DB
  timestamps: true // Genera createdAt/updatedAt automáticamente
});

module.exports = Usuario; 
// Exporta el modelo Usuario

//posibles fujncionalidades futuras
/*
👤 Usuarios
    Administrador
      **Crear, editar y eliminar usuarios.
      **Asignar roles (Coordinador, Tutor, Estudiante).
    Coordinador
      **Ver listado de tutores y estudiantes de su carrera.
    Tutor académico
      **Actualizar su perfil y disponibilidad.
    Estudiante
      **Ver y actualizar su perfil.
*/
