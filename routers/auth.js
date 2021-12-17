/*
Rutas de Usuario /auth
host + /api/auth
*/

const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();

const { validarCampos } = require('../middlewares/validar-campos');
const {crearUsuario, loginUsuario, revalidarToken,changeTheme} = require('../controllers/auth');
const {validarJWT} = require('../middlewares/validat-jwt');


router.post('/register',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({min:6}),
    validarCampos
], crearUsuario);

router.post('/',[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({min:6}),
    validarCampos
],loginUsuario );

router.put('/theme/:uid',validarJWT,  changeTheme);

router.get('/renew',validarJWT,  revalidarToken);


module.exports = router;

