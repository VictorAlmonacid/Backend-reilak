/*
Events Routes
/api/events
*/

const { Router } = require('express');



const { validarJWT } = require('../middlewares/validat-jwt');
const { cargarMultimedia, cargarMultimediaYguardar } = require('../controllers/multimedias');





const router = Router();

// Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);


//Crear una nuevo evento

router.post('/', cargarMultimedia);
router.post('/tarea/', cargarMultimediaYguardar);




module.exports = router;