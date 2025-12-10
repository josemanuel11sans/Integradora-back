const edificiosService = require('./edificios.service');
const Edificio = require("../edificios/edificios.model");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
// Obtener todos los edificios
const list = async (req, res, next) => {
  try {
    const edificios = await edificiosService.getAll();
    if (!edificios || edificios.length === 0) {
      return res.status(404).json({ 
        message: 'No hay edificios disponibles',
        data: []
      });
    }
    res.json(edificios);
  } catch (err) { 
    next(err); 
  }
};

// Obtener un edificio por ID
const getOne = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ 
        message: 'ID inválido',
        error: 'El ID debe ser un número válido'
      });
    }

    const edificio = await edificiosService.getById(id);
    if (!edificio) {
      return res.status(404).json({ 
        message: 'Edificio no encontrado',
        id: id
      });
    }

    res.json(edificio);
  } catch (err) { 
    next(err); 
  }
};

// Crear nuevo edificio
const create = async (req, res, next) => {
  try {
    const { nombre, ubicacion, estado = true } = req.body;

    // Validaciones
    if (!nombre || nombre.trim().length < 2) {
      return res.status(400).json({
        message: "El nombre del edificio es obligatorio y debe tener al menos 2 caracteres",
        field: "nombre"
      });
    }

    if (!ubicacion || ubicacion.trim().length < 2) {
      return res.status(400).json({
        message: "La dirección es obligatoria y debe tener al menos 5 caracteres",
        field: "direccion"
      });
    }

    // Verificar si ya existe un edificio con el mismo nombre
    const existente = await Edificio.findOne({
      where: { 
        nombre: nombre.trim(),
        estado: true 
      }
    });

    if (existente) {
      return res.status(409).json({ 
        message: "Ya existe un edificio activo con ese nombre",
        existingId: existente.id
      });
    }

    // Crear el edificio
    const nuevoEdificio = await Edificio.create({
      nombre: nombre.trim(),
      ubicacion: ubicacion.trim(),
      estado: true
    });

    res.status(201).json({
      message: "Edificio creado exitosamente",
      data: nuevoEdificio
    });
    
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: "Error de validación",
        errors: error.errors.map(err => ({
          field: err.path,
          message: err.message
        }))
      });
    }
    next(error);
  }
};

// Actualizar edificio por ID
const update = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ 
        message: 'ID inválido',
        error: 'El ID debe ser un número válido'
      });
    }

    const { nombre, ubicacion, estado } = req.body;

    // Verificar que el edificio exista
    const edificioExistente = await edificiosService.getById(id);
    if (!edificioExistente) {
      return res.status(404).json({ 
        message: 'Edificio no encontrado',
        id: id
      });
    }

    // Preparar datos para actualizar
    const datosActualizar = {};
    
    if (nombre !== undefined) {
      if (!nombre.trim() || nombre.trim().length < 2) {
        return res.status(400).json({
          message: "El nombre debe tener al menos 2 caracteres",
          field: "nombre"
        });
      }
      datosActualizar.nombre = nombre.trim();
      
      // Verificar si el nuevo nombre ya existe (excluyendo el actual)
      const nombreExistente = await Edificio.findOne({
        where: { 
          nombre: nombre.trim(),
          id: { [Op.ne]: id } // Excluir el edificio actual
        }
      });
      
      if (nombreExistente) {
        return res.status(409).json({ 
          message: "Ya existe otro edificio con ese nombre"
        });
      }
    }

    if (ubicacion !== undefined) {
      if (!ubicacion.trim() || ubicacion.trim().length < 1) {
        return res.status(400).json({
          message: "La dirección debe tener al menos 2 caracteres",
          field: "ubicacion"
        });
      }
      datosActualizar.ubicacion = ubicacion.trim();
    }

    if (estado !== undefined) {
      datosActualizar.estado = true;
    }

    // Si no hay datos para actualizar
    if (Object.keys(datosActualizar).length === 0) {
      return res.status(400).json({
        message: "No se proporcionaron datos para actualizar"
      });
    }

    // Actualizar el edificio
    const edificioActualizado = await edificiosService.update(id, datosActualizar);
    
    res.json({
      message: "Edificio actualizado exitosamente",
      data: edificioActualizado
    });

  } catch (err) { 
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: "Error de validación",
        errors: err.errors.map(error => ({
          field: error.path,
          message: error.message
        }))
      });
    }
    next(err); 
  }
};

// Eliminar (desactivar) edificio
const remove = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ 
        message: 'ID inválido',
        error: 'El ID debe ser un número válido'
      });
    }

    // Verificar que el edificio exista
    const edificio = await edificiosService.getById(id);
    if (!edificio) {
      return res.status(404).json({ 
        message: 'Edificio no encontrado',
        id: id
      });
    }

    // Verificar si el edificio tiene aulas asociadas antes de eliminar
    const Aula = require('../aulas/aula.model'); // Importar modelo Aula
    const aulasAsociadas = await Aula.count({
      where: { edificioId: id }
    });

    if (aulasAsociadas > 0) {
      return res.status(409).json({
        message: "No se puede eliminar el edificio porque tiene aulas asociadas",
        aulasCount: aulasAsociadas,
        suggestion: "Desactive el edificio en lugar de eliminarlo"
      });
    }

    // Eliminar físicamente el edificio
    await edificiosService.remove(id);
    
    res.status(204).end();

  } catch (err) { 
    next(err); 
  }
};

// Desactivar edificio (soft delete)
const deactivate = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ 
        message: 'ID inválido',
        error: 'El ID debe ser un número válido'
      });
    }

    const edificio = await edificiosService.getById(id);
    if (!edificio) {
      return res.status(404).json({ 
        message: 'Edificio no encontrado',
        id: id
      });
    }

    // Desactivar el edificio (cambiar estado a false)
    const edificioDesactivado = await edificiosService.update(id, { activo: false });
    
    res.json({
      message: "Edificio desactivado exitosamente",
      data: edificioDesactivado
    });

  } catch (err) { 
    next(err); 
  }
};

// Obtener aulas por edificio
const getAulasByEdificio = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ 
        message: 'ID inválido',
        error: 'El ID debe ser un número válido'
      });
    }

    const edificio = await edificiosService.getById(id);
    if (!edificio) {
      return res.status(404).json({ 
        message: 'Edificio no encontrado',
        id: id
      });
    }

    const Aula = require('../aulas/aula.model');
    const aulas = await Aula.findAll({
      where: { edificioId: id },
      include: [{
        model: Edificio,
        attributes: ['nombre', 'ubicacion']
      }]
    });

    res.json({
      edificio: {
        id: edificio.id,
        nombre: edificio.nombre,
        ubicacion: edificio.ubicacion
      },
      aulas: aulas,
      count: aulas.length
    });

  } catch (err) { 
    next(err); 
  }
};

module.exports = { 
  list, 
  getOne, 
  create, 
  update, 
  remove, 
  deactivate,
  getAulasByEdificio 
};