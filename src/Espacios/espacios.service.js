const Espacio = require('./espacios.model');
const Usuario = require('../Usuarios/usuarios.model');
const Materia = require('../Materias/materias.model');
const { Op } = require('sequelize');

// Obtener todos los espacios
const getAll = async () => {
  return await Espacio.findAll({
    where: { estado: true },
    include: [
      {
        model: Usuario,
        as: 'tutor',
        attributes: ['id_usuario', 'nombre', 'apellido', 'email']
      },
      {
        model: Materia,
        as: 'materia',
        attributes: ['id_materia', 'nombre_materia']
      }
    ],
    order: [['createdAt', 'DESC']]
  });
};

// Obtener espacios por tutor
const getByTutor = async (tutorId) => {
  return await Espacio.findAll({
    where: { tutor_id: tutorId, estado: true },
    include: [
      { 
        model: Materia,
        as: 'materia',
        attributes: ['id_materia', 'nombre_materia']
      }
    ],
    order: [['createdAt', 'DESC']]
  });
};

// Obtener espacios por materia
const getByMateria = async (materiaId) => {
  return await Espacio.findAll({
    where: { materia_id: materiaId, estado: true },
    include: [
      {
        model: Usuario,
        as: 'tutor',
        attributes: ['id_usuario', 'nombre', 'apellido']
      },
      {
        model: Materia,
        as: 'materia',
        attributes: ['id_materia', 'nombre_materia']
      }
    ]
  });
};

// Obtener un espacio por ID
const getById = async (id) => {
  return await Espacio.findByPk(id, {
    include: [
      {
        model: Usuario,
        as: 'tutor',
        attributes: ['id_usuario', 'nombre', 'apellido', 'email']
      },
      {
        model: Materia,
        as: 'materia',
        attributes: ['id_materia', 'nombre_materia']
      }
    ]
  });
};

// Buscar espacios por nombre
const searchByName = async (searchTerm) => {
  return await Espacio.findAll({
    where: {
      nombre: { [Op.like]: `%${searchTerm}%` },
      estado: true
    },
    include: [
      { model: Usuario, as: 'tutor', attributes: ['id_usuario', 'nombre', 'apellido'] },
      { model: Materia, as: 'materia', attributes: ['id_materia', 'nombre_materia'] }
    ]
  });
};

// Crear nuevo espacio
const createEspacio = async (data) => {
  const tutor = await Usuario.findByPk(data.tutor_id);

  if (!tutor) throw new Error("El tutor especificado no existe");
  if (tutor.role !== "tutor" && tutor.role !== "admin")
    throw new Error("El usuario no tiene el rol de tutor");

  const existe = await Espacio.findOne({
    where: { nombre: data.nombre, tutor_id: data.tutor_id, estado: true }
  });

  if (existe)
    throw new Error("Ya existe un espacio con ese nombre para este tutor");

  return await Espacio.create(data);
};

const updateEspacio = async (id, data) => {
  const espacio = await Espacio.findByPk(id);

  if (!espacio) return null;

  // Validar cambio de nombre (si viene en la petición)
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
      throw new Error('Ya existe un espacio con este nombre para este tutor');
    }
  }

  // Validar cambio de materia (si viene en la petición)
  if (data.materia_id && data.materia_id !== espacio.materia_id) {
    const materiaExiste = await Materia.findByPk(data.materia_id);
    if (!materiaExiste) {
      throw new Error('La materia proporcionada no existe');
    }
  }

  // Realizar actualización
  await espacio.update(data);

  return espacio;
};

module.exports = {
  getAll,
  getByTutor,
  getByMateria,
  getById,
  searchByName,
  createEspacio,
  updateEspacio
};
