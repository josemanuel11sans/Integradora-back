// src/routes/file.routes.js
const express = require("express");
const router = express.Router();
const upload = require("./upload");
const {
    uploadFile,
    getFileByPublicId,
    getFiles,
    getFilesByUsuarioId,
    getFilesByEspacioId, // debe soportar ?includeDeleted=true en el controlador
    deleteFileById,       // ahora debería marcar status=false (soft delete)
    restoreFileById,      // nuevo: status=true
} = require("./file.controller");

/**
 * @swagger
 * tags:
 *   name: Cloudinary
 *   description: Endpoints para subir y consultar archivos en la nube
 */

// 👇 permite 1 archivo (key: "file")
router.post("/upload", upload.single("file"), uploadFile);

// Nota: no consumir desde frontend
router.get("/all", getFiles);

// Obtener por publicId
router.get("/file/:publicId", getFileByPublicId);

// Archivos por usuario
router.get("/user/:usuarioId", getFilesByUsuarioId);

// Archivos por espacio (usa ?includeDeleted=true para traer también eliminados)
router.get("/espacio/:espacioId", getFilesByEspacioId);

// Eliminar archivo por id (soft delete: status=false)
router.delete("/:id", deleteFileById);

// Restaurar archivo (status=true)
router.put("/:id/restore", restoreFileById);

module.exports = router;