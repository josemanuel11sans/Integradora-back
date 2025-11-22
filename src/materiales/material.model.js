//para la persistencia de  todos los materiales como archivos, videos, audios etc se utiliza el servicios de claudinary
// Define la clase Material que hereda de Model
const { Model, DataTypes } = require('sequelize');
// Importa la instancia de Sequelize ya configurada
const { sequelize } = require('../config/db'); 
// define el modelo Material
class Material extends Model {}

Material.init({
  id_material: {
    type: DataTypes.INTEGER, // Tipo entero 
    primaryKey: true, // Clave primaria
    autoIncrement: true // Se incrementa automáticamente
    },
    titulo: {
        type: DataTypes.STRING, // Tipo texto
        allowNull: false, // No puede ser nulo
        validate: {
            notEmpty: { msg: "El título no puede estar vacío" }, // Validación: no vacío
            len: { args: [2, 200], msg: "El título debe tener entre 2 y 200 caracteres" } // Validación: longitud
        }
    },
    descripcion: {
        type: DataTypes.TEXT, // Tipo texto largo
        allowNull: true, // Puede ser nulo
        validate: {
            len: { args: [0, 1000], msg: "La descripción debe tener hasta 1000 caracteres" } // Validación: longitud
        }
    },
    url: {
        type: DataTypes.STRING, // Tipo texto
        allowNull: false, // No puede ser nulo
        validate: {
            isUrl: { msg: "Debe ser una URL válida" } // Validación de formato URL
        }
    },
    tipo: {
        type: DataTypes.ENUM('pdf', 'video', 'audio', 'link', 'otro'), // Tipo enumerado
        allowNull: false, // No puede ser nulo
        validate: {
            isIn: {
                args: [['pdf', 'video', 'audio', 'link', 'otro']],
                msg: "El tipo debe ser uno de: pdf, video, audio, link, otro"
            }
        }
    },
    fecha_subida: {
        type: DataTypes.DATE, // Tipo fecha
        defaultValue: DataTypes.NOW // Valor por defecto: fecha actual
    },
    subido_por: {
        type: DataTypes.INTEGER, // Tipo entero
        allowNull: false, // No puede ser nulo
        validate: {
            isInt: { msg: "El ID del usuario debe ser un entero" } // Validación: debe ser entero
        }
    },
    estado: {
        type: DataTypes.BOOLEAN, // Tipo booleano
        defaultValue: true // Por defecto el material está activo
    }
}, {
    sequelize, // Conexión a la base de datos
    modelName: 'Material', // Nombre del modelo
    tableName: 'materiales', // Nombre de la tabla en la base de datos
    timestamps: true // No agrega campos de timestamps automáticamente
});

module.exports = Material;





/*
📚 Materiales
Tutor académico

Subir materiales personalizados (PDF, videos, links, etc.).

Asignar materiales a estudiantes específicos o grupos.

Estudiante

Acceder y descargar materiales asignados.

Coordinador

Revisar materiales compartidos.
*/