const materiasService = require('./materias.service');

const list = async (req, res, next) => {
    try {
        const materias = await materiasService.getAll();
        if (materias.length === 0) {
            return res.status(404).json({ message: 'No hay materias disponibles' });
        }
        res.json(materias);
    } catch (err) { next(err); }
}

const listActive = async (req, res, next) => {
    try {
        const materias = await materiasService.getActive();
        if (materias.length === 0) {
            return res.status(404).json({ message: 'No hay materias disponibles' });
        }
        res.json(materias);
    } catch (err) { 
        next(err); 
    }
}

const getOne = async (req, res, next) => {
    try {
        const materia = await materiasService.getById(req.params.id);
        if (!materia) return res.status(404).json({ message: 'Materia no encontrada' });
        res.json(materia);
    } catch (err) { next(err); }
}

const create = async (req, res, next) => {
    try {
        const newMateria = await materiasService.createMateria(req.body);
        res.status(201).json(newMateria);
    } catch (err) { next(err); }
}

const update = async (req, res, next) => {
  try {
    const materia = await materiasService.getById(req.params.id);
    if (!materia) return res.status(404).json({ message: 'Materia no encontrada' });
    const updatedMateria = await materiasService.updateMateria(req.params.id, req.body);
    res.json(updatedMateria);
  } catch (err) { next(err); }
}

// materias.controller.js
const remove = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Validar existencia sin filtrar por activo
        const materia = await materiasService.getByIdIncluyendoInactivas
            ? await materiasService.getByIdIncluyendoInactivas(id)
            : await require('./materias.model').findByPk(id);

        if (!materia) {
            return res.status(404).json({ message: 'Materia no encontrada' });
        }

        const materiaActualizada = await materiasService.deleteMateria(id);
        const estadoTexto = materiaActualizada.activo ? 'activada' : 'desactivada';

        return res.status(200).json({
            message: `Materia ${estadoTexto} correctamente`,
            data: materiaActualizada
        });
    } catch (err) {
        next(err);
    }
};

const getByCarrera = async (req, res, next) => {
  try {
    const carreraId = req.params.carreraId;
    const materias = await materiasService.getMateriasByCarreraId(carreraId);
    if (materias.length === 0) {
      return res.status(404).json({ message: 'No hay materias disponibles para esta carrera' });
    }
    res.json(materias);
  } catch (err) {next(err);}
};

module.exports = { list, listActive, getOne, create, update, remove, getByCarrera };