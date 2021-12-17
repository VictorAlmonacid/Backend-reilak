/*
Post Routes
/api/posts
*/

const {Router} = require('express');
const {check} = require('express-validator');


const {validarCampos} = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validat-jwt');
const {listarPublicaciones, crearPublicacion, actualizarPublicacion, eliminarPublicacion, actualizarReaccion,listarNotificaciones,actualizarNotificacion} = require('../controllers/posts');
const { validarArchivoSubir } = require('../middlewares/validar-archivo');
// const { coleccionesPermitidas } = require('../helpers');




const router = Router();

// Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//obtener eventos
router.get('/', listarPublicaciones);

//obtener notificacion
router.get('/notificacion/', listarNotificaciones);

//editar notificacion
router.put('/notificacion/', actualizarNotificacion);

//Crear una nueva publicacion
router.post('/', crearPublicacion);

//Actualizar publicacion
router.put('/:id', actualizarPublicacion);

// Borrar evento
router.delete('/:id', eliminarPublicacion);

router.put('/reaccion/:id', actualizarReaccion)
module.exports = router;
