const espaciosService = require('./espacios.service');

// Listar todos los espacios
const list = async (req, res, next) => {
  try {
    const espacios = await espaciosService.getAll();
    res.json(espacios);
  } catch (err) {
    next(err);
  }
};

// Listar espacios de un tutor específico
const listByTutor = async (req, res, next) => {
  try {
    const espacios = await espaciosService.getByTutor(req.params.tutorId);
    res.json(espacios);
  } catch (err) {
    next(err);
  }
};

// Obtener un espacio por ID
const getOne = async (req, res, next) => {
  try {
    const espacio = await espaciosService.getById(req.params.id);
    
    if (!espacio) {
      return res.status(404).json({ 
        message: 'Espacio no encontrado' 
      });
    }
    
    res.json(espacio);
  } catch (err) {
    next(err);
  }
};

// Buscar espacios por nombre
const search = async (req, res, next) => {
  try {
    const { nombre } = req.query;
    
    if (!nombre) {
      return res.status(400).json({ 
        message: 'Debe proporcionar un término de búsqueda' 
      });
    }
    
    const espacios = await espaciosService.searchByName(nombre);
    res.json(espacios);
  } catch (err) {
    next(err);
  }
};

// Crear un nuevo espacio
const create = async (req, res, next) => {
  try {
    const nuevoEspacio = await espaciosService.createEspacio(req.body);
    
    res.status(201).json({
      message: 'Espacio registrado exitosamente',
      espacio: nuevoEspacio
    });
  } catch (err) {
    next(err);
  }
};

// Actualizar un espacio
const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const datos = req.body;

    const espacioActualizado = await espaciosService.updateEspacio(id, datos);

    if (!espacioActualizado) {
      return res.status(404).json({
        message: 'Espacio no encontrado'
      });
    }

    return res.json({
      message: 'Espacio actualizado exitosamente',
      espacio: espacioActualizado
    });

  } catch (err) {
    if (err.message.includes('nombre')) {
      return res.status(409).json({
        message: err.message,
        code: 'NAME_DUPLICATE'
      });
    }

    if (err.message.includes('materia')) {
      return res.status(400).json({
        message: err.message,
        code: 'INVALID_MATERIA'
      });
    }

    next(err);
  }
};


// Eliminar un espacio (soft delete)
const remove = async (req, res, next) => {
  try {
    const espacioEliminado = await espaciosService.deleteEspacio(req.params.id);
    
    if (!espacioEliminado) {
      return res.status(404).json({ 
        message: 'Espacio no encontrado' 
      });
    }
    
    res.json({ 
      message: 'Espacio eliminado correctamente' 
    });
  } catch (err) {
    // Manejo especial para espacios con dependencias
    if (err.message.includes('reservas o materiales')) {
      return res.status(409).json({ 
        message: err.message,
        code: 'HAS_DEPENDENCIES'
      });
    }
    next(err);
  }
};

//Listar por materia
const listByMateria = async (req, res, next) => {
  try {
    const espacios = await espaciosService.getByMateria(req.params.materiaId);
    res.json(espacios);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  list,
  listByTutor,
  getOne,
  search,
  create,
  update,
  remove,
  listByMateria
};