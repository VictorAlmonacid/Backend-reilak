const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validat-jwt');
const { listarEventos, listarEventosCercanos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/eventos');
const { validarArchivoSubir } = require('../middlewares/validar-archivo');
// const { coleccionesPermitidas } = require('../helpers');




const router = Router();

// Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//obtener eventos
router.get('/', listarEventos);

router.get('/eventoscercanos/', listarEventosCercanos);

//Crear una nuevo evento

router.post('/', crearEvento);

//Actualizar evento
router.put('/:id', actualizarEvento);

// Borrar evento
router.delete('/:id', eliminarEvento);


module.exports = router;