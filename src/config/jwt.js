//configuración de JWT
module.exports = {
    //es la clave secreta utilizada para firmar y verificar los tokens JWT.
  jwtSecret: process.env.JWT_SECRET || "super_secret_key",
    // define cuánto tiempo es válido un token JWT después de ser emitido.
  jwtExpires: process.env.ACCESS_TOKEN_EXPIRY, // tiempo de expiración del token
};
