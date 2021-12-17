const {Router} = require('express');
const {response} = require('express');


const {listarReaccion} = require('../controllers/reaccion');



const router = Router();



//Actualizar publicacion
router.get('/', listarReaccion);




module.exports = router;
