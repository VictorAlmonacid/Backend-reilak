const {response} = require('express');
const Publicacion = require('../models/Posts');
const path = require('path');
const util = require('util')
const fs   = require('fs');
const Reaccion = require('../models/Reaccion'); 
const { body } = require('express-validator');

const cloudinary = require('cloudinary').v2;
const Notificacion = require('../models/Notificacion');
const ImagenTarea = require('../models/ImagenTarea');
cloudinary.config(process.env.CLOUDINARY_URL);


const cargarMultimedia = async(req, res= response) => {
    const publicacion = new Publicacion(req.body);

    try{
        if (req.files) {
            console.log(req.files.multimedia)
            const {tempFilePath} = req.files.img;
            const {secure_url} = await cloudinary.uploader.upload(tempFilePath, { resource_type: "auto" });
 
             const multimedia = secure_url;


             
             res.status(201).json({
                 ok: true,
                 multimedia
             })

        }

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}
const cargarMultimediaYguardar = async(req, res= response) => {
    const imagenTarea = new ImagenTarea(req.body);
    console.log("linea 45",req.body)

    try{
        if (req.files) {
            console.log(req.files.multimedia)
            const {tempFilePath} = req.files.img;
            const {secure_url} = await cloudinary.uploader.upload(tempFilePath, { resource_type: "auto" });
 
             const multimedia = secure_url;
             imagenTarea.multimedia = multimedia;
             imagenTarea.save();



             
             res.status(201).json({
                 ok: true,
                 imagenTarea
             })

        }

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

module.exports = {
    cargarMultimedia,cargarMultimediaYguardar

}