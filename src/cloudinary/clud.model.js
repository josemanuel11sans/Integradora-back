// src/models/File.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

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
});

module.exports = File;
