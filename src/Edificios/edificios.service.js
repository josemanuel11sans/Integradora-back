const Edificio = require("../edificios/edificios.model");
const { Op } = require('sequelize');

const getAll = () => {
  return Edificio.findAll({
    where: { estado: true },
    order: [['nombre', 'ASC']]
  });
};

const getById = (id) => {
  return Edificio.findByPk(id);
};

const create = (data) => {
  return Edificio.create(data);
};

const update = async (id, data) => {
  const edificio = await getById(id);
  if (!edificio) {
    throw new Error("Edificio no encontrado");
  }
  return edificio.update(data);
};

const remove = async (id) => {
  const edificio = await getById(id);
  if (!edificio) {
    throw new Error("Edificio no encontrado");
  }
  return edificio.destroy();
};

// Obtener edificios activos con sus aulas
const getAllWithAulas = () => {
  const Aula = require('../aulas/aula.model');
  return Edificio.findAll({
    where: { estado: true },
    include: [{
      model: Aula,
      attributes: ['id', 'nombre', 'descripcion']
    }],
    order: [['nombre', 'ASC']]
  });
};

// Buscar edificios por nombre
const searchByName = (nombre) => {
  return Edificio.findAll({
    where: {
      nombre: {
        [Op.iLike]: `%${nombre}%`
      },
      estado: true
    },
    order: [['nombre', 'ASC']]
  });
};

module.exports = { 
  getAll, 
  getById, 
  create, 
  update, 
  remove,
  getAllWithAulas,
  searchByName
};