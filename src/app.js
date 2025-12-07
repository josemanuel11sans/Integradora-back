const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const { swaggerUi, swaggerSpec } = require("./config/swagger");
require("./utils/associations");

// configuración de Express y rutas
const express = require("express");
// importa express
const app = express();
// instancia de express
const tutorRoutes = require("./Usuarios/usuarios.routes");
const authRoutes = require("./auth/auth.routes");
const fileRoutes = require("./cloudinary/file.routes");
const asesoriasRoutes = require("./Asesorias/asesorias.routes");
const carrerasRoutes = require("./Carreras/carreras.routes");
const materiasRoutes = require("./materias/materias.routes");
const espaciosRoutes = require("./espacios/espacios.routes");
const edificiosRoutes = require("./edificios/edificios.routes");
// importa las rutas de tutores
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// límite global: 5 peticiones cada 15 min por IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // máximo de peticiones por IP
  message: { error: "Demasiadas peticiones, intenta más tarde." },
  standardHeaders: true, // devuelve info en headers estándar
  legacyHeaders: false,  // desactiva headers antiguos
});
// aplica a TODAS las rutas
// app.use(limiter);

//seguridad básica
// esta liena de código añade varias cabeceras HTTP para ayudar a proteger la aplicación de algunas vulnerabilidades web conocidas.
app.use(helmet()); // cabeceras seguras
// CORS - ajustar según necesidades
// Permitir CUALQUIER origen
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
// Necesario para que Express responda los OPTIONS sin fallar
// app.options("*", cors());

// permite solo solicitudes desde este origen
app.use(express.json());
// parsea JSON en body
app.use(morgan("dev")); // log de peticiones

// rutas
app.use("/api", tutorRoutes);
app.use("/api", authRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/asesorias",asesoriasRoutes);
app.use("/api/carreras", carrerasRoutes);
app.use("/api/materias", materiasRoutes);
app.use("/api/espacios", espaciosRoutes);
app.use("/api/edificios", edificiosRoutes);

// middleware de errores sencillo
app.use((err, req, res, next) => {
  console.error(err); // log del error
  // respuesta genérica
  res.status(500).json({ message: "Error interno", error: err.message });
});

module.exports = app;
