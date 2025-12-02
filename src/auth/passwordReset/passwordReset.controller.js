const service = require("./passwordReset.service");

const requestReset = async (req, res) => {
  try {
    const { email } = req.body;
    await service.sendResetCode(email);
    res.json({ message: "Código enviado a tu correo." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// const confirmReset = async (req, res) => {
//   try {
//     const { email, code, newPassword } = req.body;
//     await service.resetPasswordWithCode(email, code, newPassword);
//     res.json({ message: "Contraseña actualizada 👌" });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

const verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;
    await service.verifyResetCode(email, code);
    res.json({ message: "Código válido" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    await service.resetPasswordWithCode(email, code, newPassword);

    res.json({ message: "Contraseña actualizada 👌" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// module.exports = { requestReset, confirmReset };
module.exports = { requestReset, verifyCode , resetPassword};
