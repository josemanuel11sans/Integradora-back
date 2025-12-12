const Usuario = require('./usuarios.model');
const Carrera = require('../carreras/carreras.model');
// Importa los modelos Usuario y Carrera

// usuarios.service.js -> createUsuario
const bcrypt = require('bcrypt');
const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || "12");

const getAll = async () => {
  return await Usuario.findAll({
    include: [
      {
        model: Carrera,
        as: 'Carrera',
        attributes: ['id_carrera', 'nombre_carrera'],
        required: false // LEFT JOIN para mostrar usuarios sin carrera también
      }
    ],
    attributes: { exclude: ['password'] }
  });
  // Devuelve todos los usuarios activos de la base de datos con su carrera
};

const getById = async (id) => {
  return await Usuario.findByPk(id, {
    include: [
      {
        model: Carrera,
        as: 'Carrera',
        attributes: ['id_carrera', 'nombre_carrera'],
        required: false
      }
    ],
    attributes: { exclude: ['password'] }
  });
  // Busca un usuario por su primary key con su carrera
};

const createUsuario = async (data) => {
  // Verificar si ya existe un usuario con el mismo email
  const existe = await Usuario.findOne({ where: { email: data.email } });
  if (existe) {
    throw new Error('Ya existe un usuario con ese email');
  }

  // hash password
  const hash = await bcrypt.hash(data.password, SALT_ROUNDS);
  data.password = hash;

  return await Usuario.create(data);
  // Crea un nuevo usuario con los datos proporcionados
};

// createEstudiante, si el rol es student, asignar carrera_id
const createEstudiante = async (data) => {
  if (data.role !== 'student') {
    throw new Error('El rol debe ser student para crear un estudiante');
  }

  // Verificar si ya existe un usuario con el mismo email
  const existe = await Usuario.findOne({ where: { email: data.email } });
  if (existe) {
    throw new Error('Ya existe un usuario con ese email');
  }

  // hash password
  const hash = await bcrypt.hash(data.password, SALT_ROUNDS);
  data.password = hash;

  return await Usuario.create(data);
};

// usuarios.service.js
const updateUsuario = async (id, data) => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) return null;

  // Si viene password, encríptala antes de guardar
  if (data.password) {
    data.password = await bcrypt.hash(data.password, SALT_ROUNDS);
  }

  await usuario.update(data);

  // Retorna el usuario actualizado con la relación Carrera
  return await Usuario.findByPk(id, {
    include: [
      {
        model: Carrera,
        as: 'Carrera',
        attributes: ['id_carrera', 'nombre_carrera'],
        required: false
      }
    ],
    attributes: { exclude: ['password'] }
  });
};

const deleteUsuario = async (id) => {
  const usuario = await Usuario.findByPk(id, { paranoid: false });
  // paranoid: false permite encontrar usuarios inactivos también
  if (!usuario) return null;

  // Toggle: si está activo (true), lo desactiva (false) y viceversa
  const nuevoEstado = !usuario.estado;
  return await usuario.update({ estado: nuevoEstado });
};

const restoreUsuario = async (id) => {
  const usuario = await Usuario.findByPk(id);
  // Busca el usuario a restaurar
  if (!usuario) return null;
  // Si no existe, devuelve null

  // Restaura el usuario marcándolo como activo
  return await usuario.update({ estado: true });
};

const getByRole = async (role) => {
  return await Usuario.findAll({
    where: { role},
    include: [
      {
        model: Carrera,
        as: 'Carrera',
        attributes: ['id_carrera', 'nombre_carrera'],
        required: false // LEFT JOIN para mostrar usuarios sin carrera también
      }
    ],
    attributes: { exclude: ['password'] } // Excluye el password de la respuesta
  });
};

const countByRole = async () => {
  const roles = ['student', 'tutor', 'coordinator', 'admin'];
  const counts = {};

  for (const role of roles) {
    const count = await Usuario.count({ where: { role, estado: true } });
    counts[role] = count;
  }

  return counts;
};

// Actualiza la exportación:
module.exports = {
  getAll,
  getById,
  createUsuario,
  createEstudiante,
  updateUsuario,
  deleteUsuario,
  restoreUsuario,
  getByRole,
  countByRole
};