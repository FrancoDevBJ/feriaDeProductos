//ENRUTADOR PARA MANEJAR MANEJAR LA AUTENTICACION DE USUARIOS

const express = require('express');
const { register, login, getAllUsers, deleteUser, changeUserRole } = require('../controllers/auth.controller');
const { validateRegister, validateLogin, validateUserId, validateChangeRole, validateSuperAdmin } = require('../middlewares/validator');
const router = express.Router();

//Llego con /auth - esa es la ruta raíz

// RUTA PARA REGISTRAR
router.post('/register', validateRegister, register);
router.get('/users/:id', validateSuperAdmin, getAllUsers)
router.post('/login', validateLogin, login);
router.patch('/users/:id', validateUserId, validateChangeRole, changeUserRole);
router.delete('/users/:id', validateUserId,deleteUser); //Ruta parametrizada


module.exports = router;