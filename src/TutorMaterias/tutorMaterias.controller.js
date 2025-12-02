const service = require('./tutorMaterias.service');

// POST /tutores/:id/materias
const asignar = async (req, res, next) => {
  try {
    const tutorId = req.params.id;
    const { materia_id } = req.body;

    const result = await service.asignarMateria(tutorId, materia_id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};


// DELETE /tutores/:id/materias/:materiaId
const quitar = async (req, res, next) => {
  try {
    const tutorId = req.params.id;
    const materiaId = req.params.materiaId;

    const result = await service.quitarMateria(tutorId, materiaId);
    res.json(result);
  } catch (err) {
    next(err);
  }
};


// GET /tutores/:id/materias
const materiasDeTutor = async (req, res, next) => {
  try {
    const tutorId = req.params.id;

    const data = await service.obtenerMateriasDeTutor(tutorId);
    res.json(data);
  } catch (err) {
    next(err);
  }
};


// GET /materias/:id/tutores
const tutoresDeMateria = async (req, res, next) => {
  try {
    const materiaId = req.params.id;

    const data = await service.obtenerTutoresDeMateria(materiaId);
    res.json(data);
  } catch (err) {
    next(err);
  }
};


module.exports = {
  asignar,
  quitar,
  materiasDeTutor,
  tutoresDeMateria
};
