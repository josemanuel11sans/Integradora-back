const authService = require("./auth.service");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await authService.login(email, password);
    res.json(data);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

module.exports = { login };
