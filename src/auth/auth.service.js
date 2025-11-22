const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Usuario = require("../Usuarios/usuarios.model");
const { jwtSecret, jwtExpires } = require("../config/jwt");

const login = async (email, password) => {
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario) throw new Error("Credenciales inválidas");

  const valido = await bcrypt.compare(password, usuario.password);
  if (!valido) throw new Error("Credenciales inválidas");

  // Genera el token con id + rol
  const token = jwt.sign(
    { id: usuario.id_usuario, role: usuario.role },
    jwtSecret,
    { expiresIn: jwtExpires }
  );

  // Retorna usuario sin password
  const { password: _, ...safeUsuario } = usuario.toJSON();
  return { token, usuario: safeUsuario };
};

module.exports = { login };
