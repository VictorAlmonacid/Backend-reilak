/*
Post Routes
/api/posts
*/

const {Router} = require('express');
const {check} = require('express-validator');


const {validarCampos} = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validat-jwt');
const {listarChat,listarMessage, listarMiembros, listarImagesChat, listarVideosChat, listarMiembrosView, listarNoMiembros, removerUserChat} = require('../controllers/chat');
const { validarArchivoSubir } = require('../middlewares/validar-archivo');
// const { coleccionesPermitidas } = require('../helpers');




const router = Router();

// Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//obtener chats
router.get('/', listarChat);

//obtener messages
router.get('/message/:chat', listarMessage);


//obtener imagenes chat
router.get('/images/:chat', listarImagesChat);

//obtener videos chat
router.get('/videos/:chat', listarVideosChat);

//obtener miembros
router.get('/miembros/:chat', listarMiembrosView)

//obtener miembros
router.put('/miembro/:user', removerUserChat)

//obtener no miembros
router.get('/nomembers/:chat', listarNoMiembros)
module.exports = router;
