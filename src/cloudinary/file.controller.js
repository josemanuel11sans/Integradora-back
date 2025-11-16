// src/controllers/file.controller.js
const File = require("./clud.model");
const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No se subió ningún archivo" });
    }

    // Guardar en DB
    const newFile = await File.create({
      publicId: req.file.filename,
      url: req.file.path,
      folder: req.file.folder || "general",
      mimetype: req.file.mimetype,
      originalName: req.file.originalname,
    });

    res.json({
      message: "Archivo subido y guardado correctamente",
      file: newFile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al subir archivo" });
  }
};

const getFiles = async (req, res) => {
  try {
    const files = await File.findAll();
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener archivos" });
  }
};


module.exports = { uploadFile, getFiles };
