    const {response} = require('express');
const Reaccion = require('../models/Reaccion'); 
const Publicacion = require('../models/Posts');

const listarReaccion = async(req, res= response) => {

    const reaccion = await Reaccion.find()
                                            .sort({ fecha: -1 });
    
    res.json({
        ok: true,
        reaccion
    })
}



module.exports = {
    listarReaccion,

}