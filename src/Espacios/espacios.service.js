const Espacio = require('./espacios.model');
const Usuario = require('../usuarios/usuarios.model');
const { Op } = require('sequelize');

// Obtener todos los espacios
const getAll = async () => {
  return await Espacio.findAll({
    where: { estado: true },
    include: [{
      model: Usuario,
      as: 'tutor',
      attributes: ['id_usuario', 'nombre', 'apellido', 'email']
    }],
    order: [['createdAt', 'DESC']]
  });
};

// Obtener espacios por tutor
const getByTutor = async (tutorId) => {
  return await Espacio.findAll({
    where: { 
      tutor_id: tutorId,
      estado: true 
    },
    order: [['createdAt', 'DESC']]
  });
};

// Obtener un espacio por ID
const getById = async (id) => {
  return await Espacio.findByPk(id, {
    include: [{
      model: Usuario,
      as: 'tutor',
      attributes: ['id_usuario', 'nombre', 'apellido', 'email']
    }]
  });
};

// Buscar espacios por nombre
const searchByName = async (searchTerm) => {
  return await Espacio.findAll({
    where: {
      nombre: {
        [Op.like]: `%${searchTerm}%`
      },
      estado: true
    },
    include: [{
      model: Usuario,
      as: 'tutor',
      attributes: ['id_usuario', 'nombre', 'apellido']
    }]
  });
};

// Crear un nuevo espacio
const createEspacio = async (data) => {
  // Verificar que el tutor existe y tiene el rol correcto
  const tutor = await Usuario.findByPk(data.tutor_id);
  if (!tutor) {
    throw new Error('El tutor especificado no existe');
  }
  // Roles válidos según usuarios.model.js: 'student', 'tutor', 'coordinator', 'admin'
  if (tutor.role !== 'tutor' && tutor.role !== 'admin') {
    throw new Error('El usuario no tiene el rol de tutor');
  }

  // Verificar que no existe un espacio con el mismo nombre para ese tutor
  const existe = await Espacio.findOne({
    where: {
      nombre: data.nombre,
      tutor_id: data.tutor_id,
      estado: true
    }
  });
  
  if (existe) {
    throw new Error('Ya existe un espacio con ese nombre para este tutor');
  }

  return await Espacio.create(data);
};

// Actualizar un espacio
const updateEspacio = async (id, data) => {
  const espacio = await Espacio.findByPk(id);
  
  if (!espacio) {
    return null;
  }

  // Si se está actualizando el nombre, verificar que no exista otro con ese nombre
  if (data.nombre && data.nombre !== espacio.nombre) {
    const existe = await Espacio.findOne({
      where: {
        nombre: data.nombre,
        tutor_id: espacio.tutor_id,
        estado: true,
        id_espacio: { [Op.ne]: id }
      }
    });
    
    if (existe) {
      throw new Error('Ya existe un espacio con ese nombre');
    }
  }

  return await espacio.update(data);
};

// Eliminar un espacio (soft delete)
const deleteEspacio = async (id) => {
  const espacio = await Espacio.findByPk(id);
  
  if (!espacio) {
    return null;
  }

  // TODO: Verificar si tiene reservas o materiales asociados
  // Según el DFR 3.4, se debe avisar si hay reservas o materiales
  // const tieneReservas = await verificarReservas(id);
  // const tieneMateriales = await verificarMateriales(id);
  
  // if (tieneReservas || tieneMateriales) {
  //   throw new Error('El espacio tiene reservas o materiales asociados');
  // }

  // Soft delete: cambiar estado a false
  return await espacio.update({ estado: false });
};

// Eliminar permanentemente (hard delete)
const hardDeleteEspacio = async (id) => {
  const espacio = await Espacio.findByPk(id);
  
  if (!espacio) {
    return null;
  }

  await espacio.destroy();
  return espacio;
};

module.exports = {
  getAll,
  getByTutor,
  getById,
  searchByName,
  createEspacio,
  updateEspacio,
  deleteEspacio,
  hardDeleteEspacio
};