// src/controllers/file.controller.js
const File = require("./clud.model");
// Este es el mas interesante 
// Esta funcion se encarga de guardar cada uno de los archivos en la nube
// utilixando la api de cloudinari
const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No se subió ningún archivo" });
    }
  // 🔐 Identificar al usuario dueño del archivo
     const { usuarioId } = req.body;
     const {espacioId} = req.body; //opcional

     console.log("Usuario ID:", usuarioId);
     console.log("Espacio ID:", espacioId);
    // Guardar en DB
    const newFile = await File.create({
      publicId: req.file.filename,
      url: req.file.path,
      folder: req.file.folder || "general",
      mimetype: req.file.mimetype,
      originalName: req.file.originalname,
      // usuarioId: req.user.id, //se guarda el usuario que lo esta guardando
      usuarioId: usuarioId,
      espacioId: espacioId,
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

// Regresa todos los archivos en la nube
// esta ruta solo es de pureba 
// no cosumir ni agregar a la produccion
const getFiles = async (req, res) => {
  try {
    const files = await File.findAll();
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener archivos" });
  }
};

// 
// esta funcion no trar los archivos por su publicId

const getFileByPublicId = async (req, res) =>{
  try{
    const {publicId} = req.params;
    const file = await File.findOne(
      {
        where:{
          publicId
        }
      }
    );

    if(!file){
      return res.status(404).json({error:"Archivo no encontrado"});
    }

    res.json(file);

  }catch (error){
    console.log(error);
    res.status(500).json({
     error:"Error al buscar el archivo" 
    });
  }
}
// Obtener archivos por usuarioId
const getFilesByUsuarioId = async (req, res) => {
  try {
    const { usuarioId } = req.params;

    const files = await File.findAll({
      where: { usuarioId }
    });

    if (files.length === 0) {
      return res.status(404).json({ error: "No se encontraron archivos para este usuario" });
    }

    res.json(files);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener archivos por usuario" });
  }
};

//trae los archivos segun el id del espacio
const getFilesByEspacioId = async (req, res) => {
  try {
    const { espacioId } = req.params;
    const files = await File.findAll({
      where: { espacioId }
    });
    if (files.length === 0) {
      return res.status(404).json({ error: "No se encontraron archivos para este espacio" });
    }
    res.json(files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener archivos por espacio" });
  }
}

//optener solo los archivos
// Eliminar archivo: borra de Cloudinary y de la base de datos
const deleteFileById = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await File.findByPk(id);
    if (!file) {
      return res.status(404).json({ error: 'Archivo no encontrado' });
    }

    // Borrar de Cloudinary (por publicId)
    const cloudinary = require('./cloudinary');
    try {
      await cloudinary.uploader.destroy(file.publicId, { resource_type: 'auto' });
    } catch (err) {
      // Loguear pero no impedir la eliminación en BD
      console.error('Error al eliminar en Cloudinary:', err);
    }

    // Borrar registro en BD
    await file.destroy();

    res.json({ message: 'Archivo eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar archivo' });
  }
};

module.exports = { uploadFile, getFiles, getFileByPublicId, getFilesByUsuarioId, getFilesByEspacioId, deleteFileById };
