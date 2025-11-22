const authService = require("./auth.service");
const { loginWithGoogle } = require("./Oauth/google.service");
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await authService.login(email, password);
    res.json(data);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

// login con google
const loginGoogle = async (req, res) => {
  try {
    const { token } = req.body;
    const data = await loginWithGoogle(token);
    res.json(data);
  } catch (err) {
    res.status(401).json({ message: "Token de Google inválido" });
  }
};

module.exports = { login, loginGoogle };
