const edificiosService = require('./edificios.service');
const Edificio = require("../edificios/edificios.model");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// List
const list = async (req, res, next) => {
  try {
    const edificios = await edificiosService.getAll();
    // Opcional: devolver 200 con [] en lugar de 404
    return res.json(edificios);
  } catch (err) {
    next(err);
  }
};

// Get one
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
      return res.status(404).json({ message: 'Edificio no encontrado', id });
    }
    res.json(edificio);
  } catch (err) {
    next(err);
  }
};

// Create
const create = async (req, res, next) => {
  try {
    const { nombre, ubicacion, descripcion, estado = true } = req.body;

    if (!nombre || nombre.trim().length < 2) {
      return res.status(400).json({
        message: "El nombre del edificio es obligatorio y debe tener al menos 2 caracteres",
        field: "nombre"
      });
    }
    if (!ubicacion || ubicacion.trim().length < 2) {
      return res.status(400).json({
        message: "La dirección es obligatoria y debe tener al menos 2 caracteres",
        field: "direccion"
      });
    }

    const existente = await Edificio.findOne({
      where: { nombre: nombre.trim(), estado: true }
    });
    if (existente) {
      return res.status(409).json({
        message: "Ya existe un edificio activo con ese nombre",
        existingId: existente.id
      });
    }

    const nuevoEdificio = await edificiosService.create({
      nombre,
      ubicacion,
      descripcion,
      estado
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

// Update
const update = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        message: 'ID inválido',
        error: 'El ID debe ser un número válido'
      });
    }
    const { nombre, ubicacion, descripcion, estado } = req.body;

    const edificioExistente = await edificiosService.getById(id);
    if (!edificioExistente) {
      return res.status(404).json({ message: 'Edificio no encontrado', id });
    }

    const datosActualizar = {};
    if (nombre !== undefined) {
      if (!nombre.trim() || nombre.trim().length < 2) {
        return res.status(400).json({
          message: "El nombre debe tener al menos 2 caracteres",
          field: "nombre"
        });
      }
      const nombreExistente = await Edificio.findOne({
        where: { nombre: nombre.trim(), id: { [Op.ne]: id } }
      });
      if (nombreExistente) {
        return res.status(409).json({ message: "Ya existe otro edificio con ese nombre" });
      }
      datosActualizar.nombre = nombre.trim();
    }
    if (ubicacion !== undefined) {
      if (!ubicacion.trim() || ubicacion.trim().length < 2) {
        return res.status(400).json({
          message: "La dirección debe tener al menos 2 caracteres",
          field: "ubicacion"
        });
      }
      datosActualizar.ubicacion = ubicacion.trim();
    }
    if (descripcion !== undefined) {
      datosActualizar.descripcion = descripcion?.trim() || null;
    }
    if (estado !== undefined) {
      datosActualizar.estado = estado; // usar el valor enviado
    }

    if (Object.keys(datosActualizar).length === 0) {
      return res.status(400).json({ message: "No se proporcionaron datos para actualizar" });
    }

    const edificioActualizado = await edificiosService.update(id, datosActualizar);
    res.json({ message: "Edificio actualizado exitosamente", data: edificioActualizado });
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

// Remove (toggle estado)
const remove = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID inválido', error: 'El ID debe ser un número válido' });
    }

    const edificio = await edificiosService.getById(id);
    if (!edificio) {
      return res.status(404).json({ message: 'Edificio no encontrado', id });
    }

    // Si quieres bloquear eliminación física por aulas:
    const Aula = require('../aulas/aula.model');
    const aulasAsociadas = await Aula.count({ where: { edificioId: id } });
    if (aulasAsociadas > 0) {
      return res.status(409).json({
        message: "No se puede eliminar el edificio porque tiene aulas asociadas",
        aulasCount: aulasAsociadas,
        suggestion: "Desactive el edificio en lugar de eliminarlo"
      });
    }

    const actualizado = await edificiosService.remove(id);
    res.json({ message: "Estado alternado exitosamente", data: actualizado });

  } catch (err) {
    next(err);
  }
};

// Deactivate (explicit)
const deactivate = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID inválido', error: 'El ID debe ser un número válido' });
    }
    const edificio = await edificiosService.getById(id);
    if (!edificio) {
      return res.status(404).json({ message: 'Edificio no encontrado', id });
    }
    const edificioDesactivado = await edificiosService.update(id, { estado: false });
    res.json({ message: "Edificio desactivado exitosamente", data: edificioDesactivado });
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
        id
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
      aulas,
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