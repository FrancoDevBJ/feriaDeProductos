const express = require('express');
const {
    agregarLibro,
    listarLibros,
    modificarLibro,
    eliminarLibro
} = require("../controllers/product.controller");
const router = express.Router();

router.post("/agregar", agregarLibro);
router.get("/listar", listarLibros);
router.put("/:id", modificarLibro);
router.delete("/:id", eliminarLibro);

module.exports = router;