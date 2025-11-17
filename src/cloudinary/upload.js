// src/middlewares/upload.js
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

// configuración del storage
// Esta funcion se encarga de detectar el tipo de archivo  y el cCloudinaryStorage es para que se guarde directamente en la 
// nube de cloudinary
// tambien crea un dato "publiId con base la nombre del archivo"
// Nota: Normalmente para este proyecto se utilizara solo archivos de tipo .pdf
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = "general"; // carpeta por defecto
    if (file.mimetype.startsWith("image/")) folder = "imagenes";
    else if (file.mimetype === "application/pdf") folder = "pdfs";
    else if (file.mimetype.startsWith("video/")) folder = "videos";

    return {
      folder, // organiza por tipo
      resource_type: "auto", // detecta tipo automáticamente
      public_id: file.originalname.split(".")[0], // usa nombre base
    };
  },
});

const upload = multer({ storage });

module.exports = upload;

// Resumido, define como y donde se gurada el archivo 
