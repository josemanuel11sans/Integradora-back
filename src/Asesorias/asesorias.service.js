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


// Consultas especificas
// ------------Estudiante-------------

// Crear una asesoria
const createAsesoriaByStudent = async (estudiante_id, data) => {
  return await Asesoria.create({
    ...data,                 // comentarios, tutor_id, espacio_id, fecha_asesoria, carrera_id
    estudiante_id,           // forzamos que el id venga del params
    asistencia: false        // siempre false al crear
  });
};

// Obtener asesorias por estudiante

const getAsesoriasByStudent = async (studentId) => {
  return await Asesoria.findAll({
    where: { estudiante_id: studentId },
    order: [['fecha_asesoria', 'DESC']]
  });
};


module.exports = { getAll, getById, createAsesoria, updateAsesoria, deleteAsesoria, 
createAsesoriaByStudent, getAsesoriasByStudent 
}; 
// Exporta todas las funciones del servicio
