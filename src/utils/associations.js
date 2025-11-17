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

module.exports = { Usuario, File };