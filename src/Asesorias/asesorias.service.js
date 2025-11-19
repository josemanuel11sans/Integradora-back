const Asesoria = require('./asesorias.model'); 
// Importa el modelo Asesoria

// Asesorias.service.js -> createAsesoria
const bcrypt = require('bcrypt');
const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || "12");

const getAll = async () => {
  return await Asesoria.findAll(); 
  // Devuelve todos los Asesorias de la base de datos
};

const getById = async (id) => {
  return await Asesoria.findByPk(id); 
  // Busca un Asesoria por su primary key
};

const createAsesoria = async (data) => {
  // Verificar si ya existe un Asesoria con el mismo PENDIENTE
  const existe = await Asesoria.findOne({ where: { email: data.email } });
  if (existe) {
    throw new Error('Ya existe un Asesoria con ese identificador');
  }

  return await Asesoria.create(data); 
  // Crea un nuevo Asesoria con los datos proporcionados
};

const updateAsesoria = async (id, data) => {
  const Asesoria = await Asesoria.findByPk(id); 
  // Busca el Asesoria a actualizar
  if (!Asesoria) return null; 
  // Si no existe, devuelve null
  return await Asesoria.update(data); 
  // Actualiza el Asesoria con los datos proporcionados
};

const deleteAsesoria = async (id) => {
  const Asesoria = await Asesoria.findByPk(id); 
  // Busca el Asesoria a eliminar
  if (!Asesoria) return null; 
  // Si no existe, devuelve null
  await Asesoria.destroy(); 
  // Elimina el Asesoria
  return Asesoria; 
  // Devuelve el Asesoria eliminado
};

module.exports = { getAll, getById, createAsesoria, updateAsesoria, deleteAsesoria }; 
// Exporta todas las funciones del servicio
