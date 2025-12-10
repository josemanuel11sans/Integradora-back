// src/models/File.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Usuario = require("../Usuarios/usuarios.model");
//Este es el modelo usando sequelize para guardar en la base de datos las informacion de registro en la nube 
// basicamente huardo la ruta "URL" de donde se almacena cada uno de los archivos y tambien los pblicid para acceder despues 
// ellos
const File = sequelize.define("File", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  publicId: {
    type: DataTypes.STRING,
    allowNull: false, // ID de Cloudinary
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false, // URL accesible
  },
  folder: {
    type: DataTypes.STRING,
    allowNull: true, // carpeta donde lo mandaste en Cloudinary
  },
  mimetype: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  originalName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  usuarioId: { //Relacion con el modelo de Usuarios para saber que usuario esta guardando cada material
    type: DataTypes.INTEGER,
    allowNull: false,
    references:{
      model: "usuarios",
      key:"id_usuario",
    }
  },
  espacioId: { //Relacion con el modelo de Espacios para saber a que espacio pertenece cada archivo
    type: DataTypes.INTEGER,
    allowNull: true,
    references:{
      model: "espacios",
      key:"id_espacio",
    }
  }
},{
  sequelize,
  modelName: "Cloudinary",
  tableName: "cloudinary", 
  timestamps: true //genera createAt y updateAt automaticamnte 
  }
);

// Método helper: obtener archivos por espacioId
File.getByEspacioId = function(espacioId) {
  return File.findAll({ where: { espacioId } });
};

module.exports = File;
