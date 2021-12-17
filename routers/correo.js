const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();
const nodemailer = require("nodemailer");



const { enviarCorreo} = require('../controllers/correo');

router.post('/',[
    check('email', 'El email es obligatorio').isEmail(),
    
    
],enviarCorreo );



module.exports = router;