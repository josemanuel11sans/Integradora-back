// src/routes/file.routes.js
const express = require("express");
const router = express.Router();
const upload = require("./upload");
const { uploadFile } = require("./file.controller");

// 👇 permite 1 archivo (key: "file")
router.post("/upload", upload.single("file"), uploadFile);

router.get("/all", uploadFile);

module.exports = router;
