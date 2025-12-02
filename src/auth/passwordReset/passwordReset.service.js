const bcrypt = require("bcrypt");
const { Resend } = require("resend");
const Usuario = require("../../Usuarios/usuarios.model");

const resend = new Resend(process.env.RESEND_API_KEY);

// Mapa temporal de códigos (puede ser DB si quieres)
const resetCodes = new Map();

// Generar 6 dígitos
function generarCodigo() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Enviar correo con código
const sendResetCode = async (email) => {
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario) throw new Error("No existe un usuario con ese correo");

  const code = generarCodigo();

  usuario.codigo_recuperacion = code;
  usuario.codigo_expira = new Date(Date.now() + 10 * 60 * 1000); // 10 minutos
  await usuario.save();

  await resend.emails.send({
    from: "TutorHub <noreply@tutorhub.click>",
    to: email,
    subject: "Código para recuperar tu contraseña",
    html: `
      <h2>Tu código de recuperación</h2>
      <p>Usa este código para restablecer tu contraseña:</p>
      <h1 style="font-size: 32px; letter-spacing: 4px;">${code}</h1>
      <p>Expira en 10 minutos.</p>
    `,
  });

  return true;
};

// Validar el código y cambiar contraseña
const resetPasswordWithCode = async (email, code, newPassword) => {
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario) throw new Error("Usuario no encontrado");

  if (!usuario.codigo_recuperacion)
    throw new Error("No se ha solicitado recuperación");

  if (String(usuario.codigo_recuperacion) !== String(code))
  throw new Error("Código incorrecto");

  if (new Date() > usuario.codigo_expira)
    throw new Error("El código expiró");

  if (!newPassword || newPassword.trim() === "")
  throw new Error("La nueva contraseña es obligatoria");


  // Cambiar contraseña
  usuario.password = await bcrypt.hash(String(newPassword), 12);

  // Limpiar código
  usuario.codigo_recuperacion = null;
  usuario.codigo_expira = null;

  await usuario.save();

  return true;
};

const verifyResetCode = async (email, code) => {
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario) throw new Error("Usuario no encontrado");

  if (!usuario.codigo_recuperacion)
    throw new Error("No se ha solicitado recuperación");

  if (String(usuario.codigo_recuperacion) !== String(code))
    throw new Error("Código incorrecto");

  if (new Date() > usuario.codigo_expira)
    throw new Error("El código expiró");
    usuario.validateCode = true;
    await usuario.save();
  return true;
};


module.exports = { sendResetCode, resetPasswordWithCode, verifyResetCode };