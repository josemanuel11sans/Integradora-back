const { OAuth2Client } = require("google-auth-library");
const Usuario = require("../../Usuarios/usuarios.model");
const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpires } = require("../../config/jwt");
// todo este codigo verifica el token que se va a mandar desde el frontenf
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const loginWithGoogle = async (tokenGoogle) => {
  const ticket = await client.verifyIdToken({
    idToken: tokenGoogle,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload(); 
  const { email, name } = payload;

  // Verificar si el usuario existe
  let usuario = await Usuario.findOne({ where: { email } });

  // Si no existe, lo creamos
  if (!usuario) {
    usuario = await Usuario.create({
      email,
      nombre: name,
      password: null,      // No se usa
      role: "USER",        // Por defecto
    });
  }

  // Generar tu propio JWT
  const token = jwt.sign(
    { id: usuario.id_usuario, role: usuario.role },
    jwtSecret,
    { expiresIn: jwtExpires }
  );

  const { password: _, ...safeUsuario } = usuario.toJSON();

  return { token, usuario: safeUsuario };
};

module.exports = { loginWithGoogle };
