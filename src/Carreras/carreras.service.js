const Carrera = require('./carreras.model');

const getAll = async () => {
  return await Carrera.findAll({
    order: [['nombre_carrera', 'ASC']],
    where: { activo: true }
  });
};

const getById = async (id) => {
  return await Carrera.findByPk(id);
};

const createCarrera = async (data) => {
  return await Carrera.create(data);
};

const updateCarrera = async (id, data) => {
  const carrera = await Carrera.findByPk(id);
  if (!carrera || !carrera.activo) throw new Error('Carrera not found');
  return await carrera.update(data);
};

const deleteCarrera = async (id) => {
  const carrera = await Carrera.findByPk(id);
  if (!carrera || !carrera.activo) throw new Error('Carrera not found');
  await carrera.update({ activo: false });
  return carrera;
};

module.exports = { getAll, getById, createCarrera, updateCarrera, deleteCarrera };
