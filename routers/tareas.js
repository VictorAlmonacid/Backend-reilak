const {Router} = require('express');
const {check} = require('express-validator');


const {validarCampos} = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validat-jwt');
const {listarTareas, crearTareas, actualizarTareas, eliminarTareas,estadoTareas, listarIamgesTareas, removeImagesTareas, crearCommentTarea, listarComentarios, actualizarImagenTarea} = require('../controllers/tareas');
const { validarArchivoSubir } = require('../middlewares/validar-archivo');
// const { coleccionesPermitidas } = require('../helpers');




const router = Router();

// Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//obtener eventos
router.get('/', listarTareas);

router.get('/images/:tarea', listarIamgesTareas);

router.delete('/images/:tarea', removeImagesTareas);

//Crear una nueva publicacion
router.post('/comentarios', crearCommentTarea)

router.get('/comentarios/:tarea',listarComentarios)


router.post('/',    [
    check('titulo','El titulo es obligatorio').not().isEmpty().isLength({ max: 200 }),
    check('contenido','El contenido es obligatorio').not().isEmpty().isLength({ max: 200 }),
    
    validarCampos
], crearTareas);

router.put('/img/:id',  actualizarImagenTarea);

//Actualizar publicacion
router.put('/:id',  actualizarTareas);

//Estado

router.put('/estado/:id',  estadoTareas);

// Borrar evento
router.delete('/:id',  

    
    validarCampos
, eliminarTareas);


module.exports = router;