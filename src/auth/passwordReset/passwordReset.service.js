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
  <div style="
    font-family: 'Segoe UI', Helvetica, Arial, sans-serif;
    background: #f4f6fb;
    padding: 40px 0;
  ">
    <div style="
      max-width: 520px;
      margin: auto;
      background: #ffffff;
      border-radius: 14px;
      padding: 35px;
      box-shadow: 0 6px 18px rgba(0,0,0,0.08);
    ">
      <h2 style="
        color: #1f2d59;
        text-align: center;
        font-size: 26px;
        margin-bottom: 8px;
      ">
        Recuperación de contraseña
      </h2>

      <p style="
        color: #4a4a4a;
        text-align: center;
        font-size: 15px;
        margin: 0;
      ">
        Aquí tienes el código para restablecer tu contraseña.
      </p>

      <div style="
        margin: 35px auto;
        background: #eef2ff;
        border: 1px solid #d4ddff;
        border-radius: 10px;
        padding: 20px;
        text-align: center;
      ">
        <span style="
          font-size: 38px;
          font-weight: bold;
          letter-spacing: 6px;
          color: #3a57e8;
        ">
          ${code}
        </span>
      </div>

      <p style="
        color: #555;
        font-size: 14px;
        text-align: center;
        margin-bottom: 25px;
      ">
        El código expira en <strong>10 minutos</strong>.
      </p>

      <div style="text-align: center;">
        <a href="https://tutorhub.click"
          style="
            display: inline-block;
            padding: 12px 25px;
            background: #3a57e8;
            color: #fff;
            text-decoration: none;
            border-radius: 8px;
            font-size: 15px;
          "
        >
          Ir al sitio
        </a>
      </div>

      <hr style="
        margin: 30px 0;
        border: none;
        border-bottom: 1px solid #eee;
      " />

      <p style="
        color: #999;
        font-size: 12px;
        text-align: center;
      ">
        Si no solicitaste este código, puedes ignorar este mensaje.
      </p>
    </div>
  </div>
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

  if (usuario.validateCode === false)
    throw new Error("El código no ha sido verificado");


  // Cambiar contraseña
  usuario.password = await bcrypt.hash(String(newPassword), 12);

  // Limpiar código
  usuario.codigo_recuperacion = null;
  usuario.codigo_expira = null;
  usuario.validateCode = false;

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