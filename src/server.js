// src/server.js
require('dotenv').config();
require('../src/utils/associations'); // Asegura que las asociaciones se configuren
const app = require('./app');
const { sequelize, createDatabaseIfNotExists } = require('./config/db');
const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    // ✅ crea/verifica base de datos antes de usar Sequelize
    await createDatabaseIfNotExists();
    console.log(`Base de datos "${process.env.DB_NAME}" lista`);

    // conecta Sequelize
    await sequelize.authenticate();
    console.log('Conexión a la DB OK');

    // crea/actualiza tablas según modelos
    await sequelize.sync({ alter: true });
    console.log('Modelos sincronizados');

    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('No se pudo iniciar la app:', err);
    process.exit(1);
  }
};

start();
