const { body, param, validationResult} = require("express-validator");
const User = require('../models/User');
const ROLE_SUPERADMIN = 'superadmin'

//middleware para manejar los errores de validacion
const handleValidationsErrors = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            message: 'Errores de validación',
            errors: errors.mapped()
        })
    }
    next();
}

//validaciones para el registro de un usuario.
const validateRegister = [
    body('name')
    .notEmpty().withMessage('El nombre es requerido')
    .isString().withMessage('El nombre debe ser un texto')
    .trim()//para quitar los espacios
    .isLength({min: 2}).withMessage('El nombre debe tener al menos 2 caracteres'),

    body('email')
    .notEmpty().withMessage('El email es requerido')
    .isEmail().withMessage('El email no tiene un formato valido')
    .normalizeEmail()
    .custom( async (email) => {
        const user = await User.findOne({email})
        if(user){
            throw new Error('El usuario ya existe')
        }
    }),
     
    body('password')
    .notEmpty().withMessage('La contraseña es requerida')
    .isLength({min: 6}).withMessage('La contraseña debe tener al menos 6 caracteres'),

    handleValidationsErrors

]

const validateLogin = [
    body('email')
    .notEmpty().withMessage('El email es requerido')
    .isEmail().withMessage('El email ingresado debe ser válido')
    .normalizeEmail()
    .custom( async (email) => {
        const user = await User.findOne({email})
        if(!user){
            throw new Error('Credencial incorrecta')
        }
    }),

    body('password')
    .notEmpty().withMessage('La contraseña es requerida')
    .isLength({min: 6}).withMessage('La contraseña debe tener al menos 6 caracteres'),

    handleValidationsErrors
];

const validateUserId = [
    param('id')
    .isMongoId().withMessage('El ID proporcionado no es valido')
    .custom( async (id) => {
        const user = await User.findById(id);
        if(!user){
            throw new Error('El usuario no existe')
        }
    }),

    handleValidationsErrors
];

const validateChangeRole = [
    body('role')
    .notEmpty().withMessage('Debe proporcionar el rol del usuario')
    .isIn(['user', 'admin', 'superadmin']).withMessage('El rol debe ser: user, admin o superadmin'),

    handleValidationsErrors
];

const validateSuperAdmin = [
    param('id')
    .isMongoId()
    .withMessage('El ID proporcionado no es valido')
    .custom( async (id) => {
        const user = await User.findById(id);
        if(user.role !== ROLE_SUPERADMIN){
            throw new Error('El usuario no tiene permiso para esta acción')
        }
    }),

    handleValidationsErrors
]

module.exports = {
    validateRegister,
    validateLogin,
    validateUserId,
    validateChangeRole,
    validateSuperAdmin
}