const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validat-jwt');

const {
    dRadioCS,
    dRadioCE,
    dRadioCA,
    dRadioCC,
    dRadioCR,
    dCantidadU,
    dValoresPF,
    dRadioPC,
    dRadioPU,
    dRadioEU,
    dValoresEF,
    dRadioEC,
    dRadioGU,
    dValoresCU,
    dRadioUC,
    dUsuariosC
} = require('../controllers/dashboard');

const router = Router();

// Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//General - Cantidad Usuarios
router.get('/dcantidadu', dCantidadU);

//General - Usuarios Online
router.get('/dusuariosc', dUsuariosC);

//Radios - Conexiones semanales
router.get('/dradiocs', dRadioCS);

//Radios - Cantidad por edad
router.get('/dradioce', dRadioCE);

//Radios - Cantidad por rol
router.get('/dradioca', dRadioCA);

//Radios - Cantidad por cargo
router.get('/dradiocc', dRadioCC);

//Radios - Cantidad por rol
router.get('/dradiocr', dRadioCR);

//Radios - Publicaciones por usuario
router.get('/dradiopu', dRadioPU);

//Valores - Publicaciones por fecha
router.get('/dvalorespf', dValoresPF);

//Radios - Publicaciones por categoria
router.get('/dradiopc', dRadioPC);

//Radios - Eventos por usuario
router.get('/dradioeu', dRadioEU);

//Valores - Eventos por tipo
router.get('/dvaloresef', dValoresEF);

//Radios - Eventos por categoria
router.get('/dradioec', dRadioEC);

//Radios - Eventos por usuario
router.get('/dradiocg', dRadioGU);

//Radios - Eventos por fecha
router.get('/dvalorescu', dValoresCU);

//Radios - Eventos por categoria
router.get('/dradiouc', dRadioUC);

module.exports = router;