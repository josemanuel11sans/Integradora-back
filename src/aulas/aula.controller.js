const servicio = require("./aula.service");

const list = async (req, res) => {
  try {
    const aulas = await servicio.getAll();
    res.json(aulas);
  } catch (err) {
    res.status(500).json({ message: "Error al listar aulas", error: err.message });
  }
};

const get = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).json({ message: "ID inválido" });

    const aula = await servicio.getById(id);
    if (!aula) return res.status(404).json({ message: "Aula no encontrada" });

    res.json(aula);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener el aula", error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const nuevo = await servicio.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).json({ message: "ID inválido" });

    const actualizado = await servicio.update(id, req.body);
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).json({ message: "ID inválido" });

    const aula = await servicio.remove(id); // alterna estado true/false
    const message = aula.estado ? "Aula activada correctamente" : "Aula desactivada correctamente";
    res.json({ message, aula });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { list, get, create, update, remove };