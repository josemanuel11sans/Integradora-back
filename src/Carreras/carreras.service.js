const Carrera = require('./carreras.model');

const getAll = async () => {
  return await Carrera.findAll({
    order: [['nombre_carrera', 'ASC']],
    where: { activo: true },
  });
};

const getById = async (id) => {
  return await Carrera.findByPk(id);
};

const createCarrera = async (data) => {
  if (!data.nombre_carrera) throw new Error("Nombre de carrera requerido");
  if (!data.division) throw new Error("División requerida");
  return await Carrera.create({
    nombre_carrera: data.nombre_carrera,
    division: data.division,
    activo: data.activo ?? true,
  });
};

const updateCarrera = async (id, data) => {
  const carrera = await Carrera.findByPk(id);
  if (!carrera || !carrera.activo) throw new Error('Carrera not found');

  // solo permitimos actualizar estos campos
  const payload = {};
  if (data.nombre_carrera !== undefined) payload.nombre_carrera = data.nombre_carrera;
  if (data.division !== undefined) payload.division = data.division;
  if (data.activo !== undefined) payload.activo = data.activo;

  return await carrera.update(payload);
};

// Toggle lógico: activo <-> inactivo
const deleteCarrera = async (id) => {
  const carrera = await Carrera.findByPk(id);
  if (!carrera) throw new Error('Carrera not found');

  const nuevoEstado = !carrera.activo;
  await carrera.update({ activo: nuevoEstado });
  return carrera; // devuelve el estado actualizado
};

module.exports = { getAll, getById, createCarrera, updateCarrera, deleteCarrera };