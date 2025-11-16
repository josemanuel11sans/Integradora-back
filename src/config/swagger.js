// este codigo ayuda a la documentacion de las rutas de la api

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API - Mi Sistema de Tutores",
      version: "1.0.0",
      description: "Documentación de la API del sistema de tutores",
    },
    components: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  apis: ["./src/**/*.routes.js"], // <-- aquí Swagger buscará anotaciones NOTA no cambiar
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };
