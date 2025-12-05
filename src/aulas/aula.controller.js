const servicio = require("./aula.service");

const list = async (req, res) => {
  res.json(await servicio.getAll());
};

const get = async (req, res) => {
  const aula = await servicio.getById(req.params.id);
  if (!aula) return res.status(404).json({ message: "Aula no encontrada" });
  res.json(aula);
};

const create = async (req, res) => {
  try {
    const nuevo = await servicio.create(req.body);
    res.json(nuevo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const actualizado = await servicio.update(req.params.id, req.body);
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await servicio.remove(req.params.id);
    res.json({ message: "Eliminado correctamente" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { list, get, create, update, remove };
