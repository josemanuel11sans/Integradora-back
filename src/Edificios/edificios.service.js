const Edificio = require("../edificios/edificios.model");
const { Op } = require('sequelize');

const getAll = () => {
  return Edificio.findAll({
    // Sin filtro de estado: devolver activos e inactivos
    order: [['nombre', 'ASC']]
  });
};

const getById = (id) => {
  return Edificio.findByPk(id);
};

const create = async (data) => {
  // data: { nombre, ubicacion, descripcion?, estado? }
  return Edificio.create({
    nombre: data.nombre.trim(),
    ubicacion: data.ubicacion.trim(),
    descripcion: data.descripcion?.trim() || null,
    estado: typeof data.estado === 'boolean' ? data.estado : true,
  });
};

const update = async (id, data) => {
  const edificio = await getById(id);
  if (!edificio) {
    throw new Error("Edificio no encontrado");
  }
  // data puede incluir nombre, ubicacion, descripcion, estado
  return edificio.update(data);
};

const remove = async (id) => {
  const edificio = await getById(id);
  if (!edificio) {
    throw new Error("Edificio no encontrado");
  }
  // Eliminación lógica: alternar estado
  return edificio.update({ estado: !edificio.estado });
};

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