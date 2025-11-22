const Usuario = require('./usuarios.model'); 
// Importa el modelo Usuario

// usuarios.service.js -> createUsuario
const bcrypt = require('bcrypt');
const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || "12");

const getAll = async () => {
  return await Usuario.findAll(); 
  // Devuelve todos los usuarios de la base de datos
};

const getById = async (id) => {
  return await Usuario.findByPk(id); 
  // Busca un usuario por su primary key
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

const updateUsuario = async (id, data) => {
  const usuario = await Usuario.findByPk(id); 
  // Busca el usuario a actualizar
  if (!usuario) return null; 
  // Si no existe, devuelve null
  return await usuario.update(data); 
  // Actualiza el usuario con los datos proporcionados
};

const deleteUsuario = async (id) => {
  const usuario = await Usuario.findByPk(id); 
  // Busca el usuario a eliminar
  if (!usuario) return null; 
  // Si no existe, devuelve null
  await usuario.destroy(); 
  // Elimina el usuario
  return usuario; 
  // Devuelve el usuario eliminado
};

module.exports = { getAll, getById, createUsuario, updateUsuario, deleteUsuario }; 
// Exporta todas las funciones del servicio
