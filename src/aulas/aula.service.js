const Aula = require("../models/Aula");
const Edificio = require("../models/Edificio");

const getAll = () => Aula.findAll({ include: Edificio });

const getById = (id) => Aula.findByPk(id, { include: Edificio });

const create = async (data) => {
  const edificio = await Edificio.findByPk(data.edificioId);
  if (!edificio) throw new Error("El edificio no existe");
  return Aula.create(data);
};

const update = async (id, data) => {
  const aula = await getById(id);
  if (!aula) throw new Error("Aula no encontrada");

  if (data.edificioId) {
    const edificio = await Edificio.findByPk(data.edificioId);
    if (!edificio) throw new Error("El edificio no existe");
  }

  return aula.update(data);
};

const remove = async (id) => {
  const aula = await getById(id);
  if (!aula) throw new Error("Aula no encontrada");
  return aula.destroy();
};

module.exports = { getAll, getById, create, update, remove };
