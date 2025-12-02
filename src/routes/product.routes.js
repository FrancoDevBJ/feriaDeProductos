const express = require('express');
const {agregarLibro, listarLibros} = require("../controllers/product.controller");
const router = express.Router();


router.post("/agregar", agregarLibro);
router.get("/listar", listarLibros);

module.exports = router;