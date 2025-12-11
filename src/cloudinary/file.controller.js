// src/controllers/file.controller.js
const File = require("./clud.model"); // ajusta la ruta si tu modelo real está en otro archivo

// Subir archivo
const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No se subió ningún archivo" });
    }

    const { usuarioId, espacioId } = req.body;

    console.log("Usuario ID:", usuarioId);
    console.log("Espacio ID:", espacioId);

    const newFile = await File.create({
      publicId: req.file.filename,
      url: req.file.path,
      folder: req.file.folder || "general",
      mimetype: req.file.mimetype,
      originalName: req.file.originalname,
      usuarioId,
      espacioId,
    });

    console.log("Archivo guardado en DB:", newFile);

    res.json({
      message: "Archivo subido y guardado correctamente",
      file: newFile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al subir archivo" });
  }
};

// Regresa todos los archivos (incluye eliminados)
const getFiles = async (req, res) => {
  try {
    const files = await File.findAll();
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener archivos" });
  }
};

// Obtener por publicId
const getFileByPublicId = async (req, res) => {
  try {
    const { publicId } = req.params;
    const file = await File.findOne({ where: { publicId } });

    if (!file) {
      return res.status(404).json({ error: "Archivo no encontrado" });
    }

    res.json(file);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al buscar el archivo" });
  }
};

// Obtener archivos por usuarioId (solo activos)
const getFilesByUsuarioId = async (req, res) => {
  try {
    const { usuarioId } = req.params;

    const files = await File.findAll({
      where: { usuarioId, status: true },
    });

    if (files.length === 0) {
      return res
          .status(404)
          .json({ error: "No se encontraron archivos para este usuario" });
    }

    res.json(files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener archivos por usuario" });
  }
};

// Obtener archivos por espacioId (activos por defecto; incluir eliminados con ?includeDeleted=true)
const getFilesByEspacioId = async (req, res) => {
  try {
    const { espacioId } = req.params;
    const includeDeleted = req.query.includeDeleted === "true";

    const files = await File.findAll({
      where: { espacioId, ...(includeDeleted ? {} : { status: true }) },
    });

    if (files.length === 0) {
      return res
          .status(404)
          .json({ error: "No se encontraron archivos para este espacio" });
    }
    res.json(files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener archivos por espacio" });
  }
};

// Eliminar archivo: soft delete (status = false). Si quisieras borrar en Cloudinary, descomenta la parte indicada.
const deleteFileById = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await File.findByPk(id);
    if (!file) {
      return res.status(404).json({ error: "Archivo no encontrado" });
    }

    // Soft delete
    file.status = false;
    await file.save();

    // Si prefieres borrar también de Cloudinary, descomenta:
    // const cloudinary = require("./cloudinary");
    // try {
    //   await cloudinary.uploader.destroy(file.publicId, { resource_type: "auto" });
    // } catch (err) {
    //   console.error("Error al eliminar en Cloudinary:", err);
    // }

    res.json({ message: "Archivo marcado como eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar archivo" });
  }
};

// Restaurar archivo: status = true
const restoreFileById = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await File.findByPk(id);
    if (!file) {
      return res.status(404).json({ error: "Archivo no encontrado" });
    }

    file.status = true;
    await file.save();

    res.json({ message: "Archivo restaurado", file });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al restaurar archivo" });
  }
};

module.exports = {
  uploadFile,
  getFiles,
  getFileByPublicId,
  getFilesByUsuarioId,
  getFilesByEspacioId,
  deleteFileById,
  restoreFileById,
};