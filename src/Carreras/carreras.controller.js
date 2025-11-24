const carrerasService = require('./carreras.service');

const list = async (req, res, next) => {
  try {
    const carreras = await carrerasService.getAll();
    if (carreras.length === 0) {
      return res.status(404).json({ message: 'No hay carreras disponibles' });
    }
    res.json(carreras);
  } catch (err) { next(err); }
}

const getOne = async (req, res, next) => {
    try {
        const carrera = await carrerasService.getById(req.params.id); 
        if (!carrera) return res.status(404).json({ message: 'carrera no encontrada' }); 
        res.json(carrera); 
    } catch (err) { next(err); } 
}

const create = async (req, res, next) => {
    try {
        const newCarrera = await carrerasService.createCarrera(req.body); 
        res.status(201).json(newCarrera); 
    } catch (err) { next(err); }
}

const update = async (req, res, next) => {
    try {
        const carrera = await carrerasService.getById(req.params.id); 
        if (!carrera) return res.status(404).json({ message: 'carrera no encontrada' });
        const updatedCarrera = await carrerasService.updateCarrera(req.params.id, req.body); 
        res.json(updatedCarrera); 
    } catch (err) { next(err); }
}

const remove = async (req, res, next) => {
    try {
        const carrera = await carrerasService.getById(req.params.id); 
        if (!carrera) return res.status(404).json({ message: 'carrera no encontrada' }); 
        await carrerasService.deleteCarrera(req.params.id); 
        res.status(204).end(); 
    } catch (err) { next(err); }
}

module.exports = { list, getOne, create, update, remove };