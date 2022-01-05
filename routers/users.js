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
router.post('/', crearUsuario);

//Actualizar publicacion
router.put('/:id', actualizarUsuario);

// Borrar evento
router.delete('/:id', eliminarUsuario);


module.exports = router;