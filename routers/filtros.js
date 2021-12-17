/*
Rutas de Usuario /users
host + /api/users
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validat-jwt');
const { filtrarUsuarios, filtrarPorRol, busquedaUsuario } = require('../controllers/filtrosUsuarios');

const router = Router();

// Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//obtener usuario por estado
router.get('/:estado', filtrarUsuarios);

//obtener usuario por rol
router.get('/rol/:rol', filtrarPorRol);

//obtener usuario por rol
router.get('/buscar/:buscar', busquedaUsuario);

module.exports = router;