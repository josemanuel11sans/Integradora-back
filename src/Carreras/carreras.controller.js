const carrerasService = require('./carreras.service');
const Carrera = require('./carreras.model');

// Obtener todas las carreras
const list = async (req, res, next) => {
  try {
    const carreras = await carrerasService.getAll();
    if (!carreras || carreras.length === 0) {
      return res.status(404).json({ message: 'No hay carreras disponibles' });
    }
    res.json(carreras);
  } catch (err) { next(err); }
};

// Obtener una por ID
const getOne = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

    const carrera = await carrerasService.getById(id);
    if (!carrera || !carrera.activo) {
      return res.status(404).json({ message: 'Carrera no encontrada' });
    }

    res.json(carrera);
  } catch (err) { next(err); }
};

// Crear carrera
const create = async (req, res) => {
  try {
    const { nombre_carrera } = req.body;

    if (!nombre_carrera || nombre_carrera.trim().length < 2) {
      return res.status(400).json({
        message: "El nombre de la carrera es obligatorio y debe tener al menos 2 caracteres"
      });
    }

    const existente = await Carrera.findOne({
      where: { nombre_carrera: nombre_carrera.trim() }
    });

    if (existente) {
      return res.status(400).json({ message: "La carrera ya existe" });
    }

    const nueva = await Carrera.create({
      nombre_carrera: nombre_carrera.trim()
    });

    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ message: "Error del servidor", error: error.message });
  }
};

// Actualizar carrera por ID
const update = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

    const { nombre_carrera } = req.body;

    if (!nombre_carrera || nombre_carrera.trim().length < 2) {
      return res.status(400).json({
        message: "El nombre de la carrera es obligatorio y debe tener al menos 2 caracteres"
      });
    }

    const existente = await carrerasService.getById(id);
    if (!existente || !existente.activo) {
      return res.status(404).json({ message: 'Carrera no encontrada' });
    }

    const actualizada = await carrerasService.updateCarrera(id, {
      nombre_carrera: nombre_carrera.trim()
    });

    res.json(actualizada);

  } catch (err) { next(err); }
};

// Eliminar (desactivar) carrera
const remove = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

    const carrera = await carrerasService.getById(id);
    if (!carrera || !carrera.activo) {
      return res.status(404).json({ message: 'Carrera no encontrada' });
    }

    await carrerasService.deleteCarrera(id);
    res.status(204).end();

  } catch (err) { next(err); }
};

module.exports = { list, getOne, create, update, remove };
