// src/middlewares/upload.js
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

// configuración del storage
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
