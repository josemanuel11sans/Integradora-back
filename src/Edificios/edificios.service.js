const Edificio = require("../models/Edificio");

const getAll = () => Edificio.findAll();

const getById = (id) => Edificio.findByPk(id);

const create = (data) => Edificio.create(data);

const update = async (id, data) => {
  const edificio = await getById(id);
  if (!edificio) throw new Error("Edificio no encontrado");
  return edificio.update(data);
};

const remove = async (id) => {
  const edificio = await getById(id);
  if (!edificio) throw new Error("Edificio no encontrado");
  return edificio.destroy();
};

module.exports = { getAll, getById, create, update, remove };
