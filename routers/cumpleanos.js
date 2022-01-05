const {Router} = require('express');
const {check} = require('express-validator');


const {validarCampos} = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validat-jwt');
const {listarCumpleañeros, createBirthday, listarMessageBirthday, changeViewedBirthday} = require('../controllers/cumpleaño');
// const { coleccionesPermitidas } = require('../helpers');




const router = Router();

// Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//obtener eventos
router.get('/', listarCumpleañeros);

router.get('/message', listarMessageBirthday);

router.post('/', createBirthday);

router.put('/:id', changeViewedBirthday);
//Crear una nueva publicacion

// router.post('/',    [
//     check('titulo','El titulo es obligatorio').not().isEmpty().isLength({ max: 15 }),
//     check('contenido','El contenido es obligatorio').not().isEmpty().isLength({ max: 200 }),
    
//     validarCampos
// ], crearTareas);


module.exports = router;