//ENRUTADOR PARA MANEJAR MANEJAR LOS ENDPOINTS DE USUARIOS

const express = require('express');
const router = express.Router();

//Llego con /users - esa es la ruta raíz

// RUTA PARA OBTENER EL PERFIL DEL USUARIO AUTENTICADO
router.get('/profile', (req, res) => {
    res.send('Datos del perfil del usuario.');
});

// RUTA PARA ACTUALIZAR LA INFORMACIÓN DEL PERFIL
router.put('/profile', (req, res) => {
    const { name, address } = req.body;
    res.send(`Perfil de usuario actualizado. Nuevo nombre: ${name}`);
});

// RUTA PARA ELIMINAR LA CUENTA DE USUARIO
router.delete('/', (req, res) => {
    res.send('Cuenta de usuario eliminada permanentemente.');
});

module.exports = router;