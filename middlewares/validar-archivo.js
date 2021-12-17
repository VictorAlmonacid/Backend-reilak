const { response } = require("express")


const validarArchivoSubir = (req, res = response, next ) => {
    // console.log('aers', req.files)
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.multimedia ) {
        return res.status(400).json({
            msg: 'No hay archivos que subir - validarArchivoSubir'
        });
    }
    

    next();

}


module.exports = {
    validarArchivoSubir
}
