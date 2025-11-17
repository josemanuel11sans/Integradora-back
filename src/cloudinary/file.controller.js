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
    // Guardar en DB
    const newFile = await File.create({
      publicId: req.file.filename,
      url: req.file.path,
      folder: req.file.folder || "general",
      mimetype: req.file.mimetype,
      originalName: req.file.originalname,
      // usuarioId: req.user.id, //se guarda el usuario que lo esta guardando
      usuarioId: usuarioId
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


//optener solo los archivos

module.exports = { uploadFile, getFiles, getFileByPublicId };
