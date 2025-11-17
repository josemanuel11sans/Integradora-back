// src/routes/file.routes.js
const express = require("express");
const router = express.Router();
const upload = require("./upload");
const { uploadFile, getFileByPublicId ,getFiles } = require("./file.controller");

// 👇 permite 1 archivo (key: "file")
router.post("/upload", upload.single("file"), uploadFile);
//ruta para traer todos los archivos de la nube
//Nota: no consumir
router.get("/all", getFiles);

router.get("/file/:publicId", getFileByPublicId);

module.exports = router;
