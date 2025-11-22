const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config/jwt");

const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer TOKEN"
  
  if (!token) return res.status(401).json({ message: "Token requerido" });

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Token inválido" });
    req.user = decoded; // { id, role }
    next();
  });
};

module.exports = authenticate;
