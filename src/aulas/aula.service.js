const Aula = require("./aula.model");
const Edificio = require("../Edificios/edificios.model");

const getAll = async () => {
  return Aula.findAll({
    include: [{ model: Edificio }],
    order: [["createdAt", "DESC"]],
  });
};

const getById = async (id) => {
  return Aula.findByPk(id, {
    include: [{ model: Edificio }],
  });
};

const create = async (data) => {
  const { edificioId } = data;

  const edificio = await Edificio.findByPk(edificioId);
  if (!edificio) throw new Error("El edificio no existe");

  const payload = {
    nombre: data.nombre?.trim(),
    descripcion: data.descripcion,
    edificioId,
    estado: typeof data.estado === "boolean" ? data.estado : true,
  };

  const aula = await Aula.create(payload);
  return getById(aula.id);
};

const update = async (id, data) => {
  const aula = await Aula.findByPk(id);
  if (!aula) throw new Error("Aula no encontrada");

  if (data.edificioId) {
    const edificio = await Edificio.findByPk(data.edificioId);
    if (!edificio) throw new Error("El edificio no existe");
  }

  const datosActualizar = {};
  if (data.nombre !== undefined) datosActualizar.nombre = data.nombre?.trim();
  if (data.descripcion !== undefined) datosActualizar.descripcion = data.descripcion;
  if (data.edificioId !== undefined) datosActualizar.edificioId = data.edificioId;
  if (typeof data.estado === "boolean") datosActualizar.estado = data.estado;

  await aula.update(datosActualizar);
  return getById(id);
};

const remove = async (id) => {
  const aula = await Aula.findByPk(id);
  if (!aula) throw new Error("Aula no encontrada");

  const nuevoEstado = !aula.estado;
  await aula.update({ estado: nuevoEstado });

  return getById(id);
};

module.exports = { getAll, getById, create, update, remove };