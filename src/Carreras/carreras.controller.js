const carrerasService = require('./carreras.service');
const Carrera = require('./carreras.model');

const DIVISIONES = ['DATIC', 'DAMI', 'TALLER PESADO'];

// Obtener todas las carreras (solo activas)
const list = async (req, res, next) => {
  try {
    const carreras = await carrerasService.getAll();
    if (!carreras || carreras.length === 0) {
      return res.status(404).json({ message: 'No hay carreras disponibles' });
    }
    res.json(carreras);
  } catch (err) { next(err); }
};

// Obtener una por ID (solo activas)
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
    const { nombre_carrera, division } = req.body;

    const nombre = (nombre_carrera || '').trim();
    if (!nombre || nombre.length < 2) {
      return res.status(400).json({
        message: "El nombre de la carrera es obligatorio y debe tener al menos 2 caracteres"
      });
    }

    if (!division || !DIVISIONES.includes(division)) {
      return res.status(400).json({ message: 'División inválida' });
    }

    const existente = await Carrera.findOne({ where: { nombre_carrera: nombre } });
    if (existente) {
      return res.status(400).json({ message: "La carrera ya existe" });
    }

    const nueva = await Carrera.create({
      nombre_carrera: nombre,
      division,
      activo: true
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

    const { nombre_carrera, division } = req.body;
    const nombre = (nombre_carrera || '').trim();

    if (!nombre || nombre.length < 2) {
      return res.status(400).json({
        message: "El nombre de la carrera es obligatorio y debe tener al menos 2 caracteres"
      });
    }

    if (!division || !DIVISIONES.includes(division)) {
      return res.status(400).json({ message: 'División inválida' });
    }

    const existente = await carrerasService.getById(id);
    if (!existente) {  // ✅ Solo verifica que exista, NO que sea activo
      return res.status(404).json({ message: 'Carrera no encontrada' });
    }

    const actualizada = await carrerasService.updateCarrera(id, {
      nombre_carrera: nombre,
      division
    });

    res.json(actualizada);
  } catch (err) { next(err); }
};

// Eliminar (toggle lógico) carrera
const remove = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

    const carrera = await carrerasService.getById(id); // incluye activas e inactivas
    if (!carrera) {
      return res.status(404).json({ message: 'Carrera no encontrada' });
    }

    const updated = await carrerasService.deleteCarrera(id); // toggle activo <-> inactivo
    const estadoTexto = updated.activo ? 'activada' : 'desactivada';

    return res.status(200).json({
      message: `Carrera ${estadoTexto} correctamente`,
      data: updated
    });
  } catch (err) { next(err); }
};

module.exports = { list, getOne, create, update, remove };