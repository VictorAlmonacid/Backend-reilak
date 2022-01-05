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
    dUsuariosC,
    dTotalTC,
    dPruebaCF,
    dValoresCC,
    dValoresCT,
    dValoresCCG,
    dValoresCCP,
    dValoresCCC,
    dValoresCTP,
    dValoresCTA,
    dValoresCTC
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

//Radios - Total tiempo conexion
router.post('/ttc/', dTotalTC);

// //Radios - Total tiempo conexion
router.get('/prcf', dPruebaCF);

//Valores - Cantidad Chats
router.get('/dvalorescc', dValoresCC);

//Valores - Cantidad Chats Personal
router.get('/dvaloresccp', dValoresCCP);

//Valores - Cantidad Chats Grupal
router.get('/dvaloresccg', dValoresCCG);

//Valores - Cantidad Chats Canal
router.get('/dvaloresccc', dValoresCCC);

//Valores - Cantidad Tareas
router.get('/dvaloresct', dValoresCT);

//Valores - Cantidad Tareas en Proceso
router.get('/dvaloresctp', dValoresCTP);

//Valores - Cantidad Tareas Atrasadas
router.get('/dvalorescta', dValoresCTA);

//Valores - Cantidad Tareas Completadas
router.get('/dvaloresctc', dValoresCTC);

module.exports = router;