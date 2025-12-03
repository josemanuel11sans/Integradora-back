// src/routes/file.routes.js
const express = require("express");
const router = express.Router();
const upload = require("./upload");
const { uploadFile, getFileByPublicId ,getFiles, getFilesByEspacioId } = require("./file.controller");

/**
 * @swagger
 * tags:
 *   name: Cloudinary
 *   description: Endpoints para subir y consultar archivos en la nube
 */


/**
 * @swagger
 * /api/files/upload:
 *   post:
 *     summary: Subir un archivo a Cloudinary
 *     tags: [Cloudinary]
 *     description: Sube un archivo usando multipart/form-data.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Archivo subido correctamente.
 *       400:
 *         description: Error al subir el archivo.
 */
// 👇 permite 1 archivo (key: "file")
router.post("/upload", upload.single("file"), uploadFile);
/**
 * @swagger
 * /api/files/all:
 *   get:
 *     summary: Obtener todos los archivos de Cloudinary
 *     tags: [Cloudinary]
 *     description: Devuelve todos los archivos almacenados en Cloudinary.  
 *                  **Nota:** No consumir desde frontend.
 *     responses:
 *       200:
 *         description: Lista de archivos recuperada correctamente.
 */
//ruta para traer todos los archivos de la nube
//Nota: no consumir
router.get("/all", getFiles);
/**
 * @swagger
 * /api/files/file/{publicId}:
 *   get:
 *     summary: Obtener un archivo específico
 *     tags: [Cloudinary]
 *     description: Busca un archivo por su `publicId`.
 *     parameters:
 *       - in: path
 *         name: publicId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID público del archivo en Cloudinary.
 *     responses:
 *       200:
 *         description: Archivo recuperado correctamente.
 *       404:
 *         description: Archivo no encontrado.
 */
router.get("/file/:publicId", getFileByPublicId);


//optener los archivos por espacio id
router.get("/espacio/:espacioId", getFilesByEspacioId);

module.exports = router;
