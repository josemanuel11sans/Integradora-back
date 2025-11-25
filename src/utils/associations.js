const Usuario = require("../Usuarios/usuarios.model");
const File = require("../cloudinary/clud.model");

Usuario.hasMany(File, {
  foreignKey: "usuarioId",
  as: "archivos",
});

File.belongsTo(Usuario, {
  foreignKey: "usuarioId",
  as: "usuario",
});

module.exports = { Usuario, File };const Usuario = require("../Usuarios/usuarios.model");
const File = require("../cloudinary/clud.model");
const Espacio = require("../Espacios/espacios.model");

// Relación Usuario - File
Usuario.hasMany(File, {
  foreignKey: "usuarioId",
  as: "archivos",
});

File.belongsTo(Usuario, {
  foreignKey: "usuarioId",
  as: "usuario",
});

Usuario.hasMany(Espacio, {
  foreignKey: "tutor_id",
  as: "espacios",
});

Espacio.belongsTo(Usuario, {
  foreignKey: "tutor_id",
  as: "tutor",
});

module.exports = { Usuario, File, Espacio };