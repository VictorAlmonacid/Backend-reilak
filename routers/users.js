/*
Rutas de Usuario /users
host + /api/users
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validat-jwt');
const { listarUsuarios, buscarUsuario, crearUsuario, actualizarUsuario, eliminarUsuario, listaCumpleaños } = require('../controllers/usuarios');

const router = Router();

// Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//obtener eventos
router.get('/', listarUsuarios);

//obtener cumpleaños
// router.get('/birthday/', listaCumpleaños);

//Crear una nueva publicacion
router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
    check('rut', 'El rut debe de ser de 9 caracteres').isLength({ min: 9 }),
    check('apellidoPaterno', 'El apellido paterno es obligatorio').not().isEmpty(),
    validarCampos
], crearUsuario);

//Actualizar publicacion
router.put('/:id', actualizarUsuario);

// Borrar evento
router.delete('/:id', eliminarUsuario);


module.exports = router;