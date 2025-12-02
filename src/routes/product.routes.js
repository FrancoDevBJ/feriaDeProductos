const express = require('express');
const {} = require("../controllers/products.controller");
const router = express.Router();


router.post("/agregar", agregarLibro);
router.get("/listar", listarLibros);

module.exports = router;