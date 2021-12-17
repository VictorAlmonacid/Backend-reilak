const { response } = require('express');
const Chat = require('../models/Chat');
const conexion = require('../models/Conexion');
const Eventos = require('../models/Eventos');
const Publicaciones = require('../models/Posts');
const usuarios = require('../models/Usuarios');


//GENERAL - CANTIDAD USUARIOS
const dCantidadU = async (req, res = response) => {

    const usuario1 = await usuarios.aggregate([
        { $group: { _id: "$_id", "conexiones": { $sum: 1 }, } }
    ])
    res.json({
        ok: true,
        usuario1,
    })
}

//GENERAL - CANTIDAD USUARIOS
const dUsuariosC = async (req, res = response) => {

    const usuario1 = await usuarios.aggregate([
        { $match: { online: true } },
        { $group: { _id: "$_id", "conexiones": { $sum: 1 }, } }
    ])
    res.json({
        ok: true,
        usuario1,
    })
}


//RADIO - CONEXIONES POR SEMANA
const dRadioCS = async (req, res = response) => {
    console.log("RadioConexionesPorSemana");
    const usuario1 = await conexion.aggregate([
        {
            // etapa $lookup
            $lookup:
            {
                from: 'usuarios', // <- nombre de la colección de donde se extrae la data
                localField: 'usuario', // <- nombre del campo local (post.user) que tiene la referencia a users
                foreignField: '_id', // <- nombre del campo de la colección users al que se hace la referencia
                as: 'usuario' // <- nombre del campo que almacenará el resultado (se sobreescribe post.user)
            }
        },
        // etapa $unwind
        {
            $unwind: '$usuario' // <- nombre del campo que contiene el array de objetos
        },
        // etapa $match
        { $match: { $and: [{ fechainicio: { '$gte': new Date("2021-08-00T00:00:00.000+00:00"), '$lte': new Date("2021-11-11T23:59:59.000+00:00") } }] } },
        { $group: { _id: "$usuario", "conexiones": { $sum: 1 }, } }
    ])
    res.json({
        ok: true,
        usuario1,
    })
}

//RADIO - USUARIOS POR EDAD
const dRadioCE = async (req, res = response) => {
    console.log("ConexionesPorEdad");
    const usuario1 = await conexion.aggregate([
        {
            // etapa $lookup
            $lookup:
            {
                from: 'usuarios', // <- nombre de la colección de donde se extrae la data
                localField: 'usuario', // <- nombre del campo local (post.user) que tiene la referencia a users
                foreignField: '_id', // <- nombre del campo de la colección users al que se hace la referencia
                as: 'usuario' // <- nombre del campo que almacenará el resultado (se sobreescribe post.user)
            }
        },
        // etapa $unwind
        {
            $unwind: '$usuario' // <- nombre del campo que contiene el array de objetos
        },
        // etapa $match
        {
            $match: {
                $and: [{
                    fechainicio: {
                        '$gte': new Date("2021-08-00T00:00:00.000+00:00"),
                        '$lte': new Date("2021-11-11T23:59:59.000+00:00")
                    }
                }]
            }
        },
        { $group: { _id: "$usuario.edad", "conexiones": { $sum: 1 }, } },
    ])
    res.json({
        ok: true,
        usuario1,
    })
}

//RADIO - USUARIOS POR AREA
const dRadioCA = async (req, res = response) => {
    const usuario1 = await conexion.aggregate([
        {
            // etapa $lookup
            $lookup:
            {
                from: 'usuarios', // <- nombre de la colección de donde se extrae la data
                localField: 'usuario', // <- nombre del campo local (post.user) que tiene la referencia a users
                foreignField: '_id', // <- nombre del campo de la colección users al que se hace la referencia
                as: 'usuario' // <- nombre del campo que almacenará el resultado (se sobreescribe post.user)
            }
        },
        // etapa $unwind
        {
            $unwind: '$usuario' // <- nombre del campo que contiene el array de objetos
        },
        // etapa $match
        {
            $match: {
                $and: [{ fechainicio: { '$gte': new Date("2021-08-00T00:00:00.000+00:00"), '$lte': new Date("2021-11-11T23:59:59.000+00:00") } }]
            }
        },
        { $group: { _id: "$usuario.area", "conexiones": { $sum: 1 }, } }
    ])
    res.json({
        ok: true,
        usuario1,
    })
}

//RADIO - CONEXIONES POR CARGO
const dRadioCC = async (req, res = response) => {
    console.log("ConexionesPorCargo");
    const usuario1 = await conexion.aggregate([
        {
            // etapa $lookup
            $lookup:
            {
                from: 'usuarios', // <- nombre de la colección de donde se extrae la data
                localField: 'usuario', // <- nombre del campo local (post.user) que tiene la referencia a users
                foreignField: '_id', // <- nombre del campo de la colección users al que se hace la referencia
                as: 'usuario' // <- nombre del campo que almacenará el resultado (se sobreescribe post.user)
            }
        },
        // etapa $unwind
        {
            $unwind: '$usuario' // <- nombre del campo que contiene el array de objetos
        },
        // etapa $match
        {
            $match: {
                $and: [{ fechainicio: { '$gte': new Date("2021-08-00T00:00:00.000+00:00"), '$lte': new Date("2021-11-11T23:59:59.000+00:00") } }]
            }
        },
        { $group: { _id: "$usuario.cargo", "conexiones": { $sum: 1 }, } }
    ])
    res.json({
        ok: true,
        usuario1,
    })
}

//RADIO - CONEXIONES POR ROL
const dRadioCR = async (req, res = response) => {
    console.log("ConexionesPorRol");
    const usuario1 = await conexion.aggregate([
        {
            // etapa $lookup
            $lookup:
            {
                from: 'usuarios', // <- nombre de la colección de donde se extrae la data
                localField: 'usuario', // <- nombre del campo local (post.user) que tiene la referencia a users
                foreignField: '_id', // <- nombre del campo de la colección users al que se hace la referencia
                as: 'usuario' // <- nombre del campo que almacenará el resultado (se sobreescribe post.user)
            }
        },
        // etapa $unwind
        {
            $unwind: '$usuario' // <- nombre del campo que contiene el array de objetos
        },
        // etapa $match
        {
            $match: {
                $and: [{ fechainicio: { '$gte': new Date("2021-08-00T00:00:00.000+00:00"), '$lte': new Date("2021-11-11T23:59:59.000+00:00") } }]
            }
        },
        { $group: { _id: "$usuario.rol", "conexiones": { $sum: 1 }, } }
    ])
    res.json({
        ok: true,
        usuario1,
    })
}

//RADIO - PUBLICACIONES POR USUARIO
const dRadioPU = async (req, res = response) => {
    const usuario1 = await Publicaciones.aggregate([
        {
            // etapa $lookup
            $lookup:
            {
                from: 'usuarios', // <- nombre de la colección de donde se extrae la data
                localField: 'usuario', // <- nombre del campo local (post.user) que tiene la referencia a users
                foreignField: '_id', // <- nombre del campo de la colección users al que se hace la referencia
                as: 'usuario' // <- nombre del campo que almacenará el resultado (se sobreescribe post.user)
            }
        },
        // etapa $unwind
        {
            $unwind: '$usuario' // <- nombre del campo que contiene el array de objetos
        },
        // etapa $match
        {
            $match: {
                $and: [{ fecha: { '$gte': new Date("2021-08-00T00:00:00.000+00:00"), '$lte': new Date("2022-11-11T23:59:59.000+00:00") } }]
            }
        },
        { $group: { _id: "$usuario", "conexiones": { $sum: 1 }, } }
    ])
    res.json({
        ok: true,
        usuario1,
    })
}

//RADIO - REACCIONES POR PUBLICACION
const dValoresPF = async (req, res = response) => {
    const usuario1 = await conexion.aggregate([
        {
            // etapa $lookup
            $lookup:
            {
                from: 'usuarios', // <- nombre de la colección de donde se extrae la data
                localField: 'usuario', // <- nombre del campo local (post.user) que tiene la referencia a users
                foreignField: '_id', // <- nombre del campo de la colección users al que se hace la referencia
                as: 'usuario' // <- nombre del campo que almacenará el resultado (se sobreescribe post.user)
            }
        },
        // etapa $unwind
        {
            $unwind: '$usuario' // <- nombre del campo que contiene el array de objetos
        },
        // etapa $match
        {
            $match: {
                $and: [{ fechainicio: { '$gte': new Date("2021-08-00T00:00:00.000+00:00"), '$lte': new Date("2021-11-11T23:59:59.000+00:00") } }]
            }
        },
        { $group: { _id: "$usuario.rol", "conexiones": { $sum: 1 }, } }
    ])
    res.json({
        ok: true,
        usuario1,
    })
}

//RADIO - PUBLICACIONES POR CATEGORIA
const dRadioPC = async (req, res = response) => {
    const usuario1 = await Publicaciones.aggregate([
        {
            $match: {
                $and: [{ fecha: { '$gte': new Date("2021-08-00T00:00:00.000+00:00"), '$lte': new Date("2022-11-11T23:59:59.000+00:00") } }
                    ,
                ]
            }
        },
        { $group: { _id: "$categoria", "conexiones": { $sum: 1 }, } }
    ])
    res.json({
        ok: true,
        usuario1,
    })
}


//RADIO - EVENTOS POR USUARIO
const dRadioEU = async (req, res = response) => {
    const usuario1 = await Eventos.aggregate([
        {
            // etapa $lookup
            $lookup:
            {
                from: 'usuarios', // <- nombre de la colección de donde se extrae la data
                localField: 'usuario', // <- nombre del campo local (post.user) que tiene la referencia a users
                foreignField: '_id', // <- nombre del campo de la colección users al que se hace la referencia
                as: 'usuario' // <- nombre del campo que almacenará el resultado (se sobreescribe post.user)
            }
        },
        // etapa $unwind
        {
            $unwind: '$usuario' // <- nombre del campo que contiene el array de objetos
        },
        // etapa $match
        // {
        //     $match: {
        //         $and: [{ fechainicio: { '$gte': new Date("2021-08-00T00:00:00.000+00:00"), '$lte': new Date("2022-11-11T23:59:59.000+00:00") } }]
        //     }
        // },
        { $group: { _id: "$usuario", "conexiones": { $sum: 1 }, } }
    ])
    res.json({
        ok: true,
        usuario1,
    })
}

//RADIO - EVENTOS POR TIPO
const dValoresEF = async (req, res = response) => {
    const usuario1 = await Eventos.aggregate([
        { $group: { _id: "$tipo", "conexiones": { $sum: 1 }, } }
    ])
    res.json({
        ok: true,
        usuario1,
    })
}

//RADIO - EVENTOS POR CATEGORIA
const dRadioEC = async (req, res = response) => {
    const usuario1 = await Eventos.aggregate([
        { $group: { _id: "$categoria", "conexiones": { $sum: 1 }, } }
    ])
    res.json({
        ok: true,
        usuario1,
    })
}

//RADIO - CHATS POR USUARIO
const dRadioGU = async (req, res = response) => {
    const usuario1 = await Chat.aggregate([
        {
            // etapa $lookup
            $lookup:
            {
                from: 'usuarios', // <- nombre de la colección de donde se extrae la data
                localField: 'members', // <- nombre del campo local (post.user) que tiene la referencia a users
                foreignField: '_id', // <- nombre del campo de la colección users al que se hace la referencia
                as: 'usuario' // <- nombre del campo que almacenará el resultado (se sobreescribe post.user)
            }
        },
        // etapa $unwind
        {
            $unwind: '$usuario' // <- nombre del campo que contiene el array de objetos
        },
        // etapa $match
        // {
        //     $match: {
        //         $and: [{ fechainicio: { '$gte': new Date("2021-08-00T00:00:00.000+00:00"), '$lte': new Date("2021-11-11T23:59:59.000+00:00") } }]
        //     }
        // },
        { $group: { _id: "$usuario", "conexiones": { $sum: 1 }, } }
    ])
    res.json({
        ok: true,
        usuario1,
    })
}

//RADIO - PUBLICACIONES POR USUARIO
const dValoresCU = async (req, res = response) => {
    const usuario1 = await conexion.aggregate([
        {
            // etapa $lookup
            $lookup:
            {
                from: 'usuarios', // <- nombre de la colección de donde se extrae la data
                localField: 'usuario', // <- nombre del campo local (post.user) que tiene la referencia a users
                foreignField: '_id', // <- nombre del campo de la colección users al que se hace la referencia
                as: 'usuario' // <- nombre del campo que almacenará el resultado (se sobreescribe post.user)
            }
        },
        // etapa $unwind
        {
            $unwind: '$usuario' // <- nombre del campo que contiene el array de objetos
        },
        // etapa $match
        {
            $match: {
                $and: [{ fechainicio: { '$gte': new Date("2021-08-00T00:00:00.000+00:00"), '$lte': new Date("2021-11-11T23:59:59.000+00:00") } }]
            }
        },
        { $group: { _id: "$usuario.rol", "conexiones": { $sum: 1 }, } }
    ])
    res.json({
        ok: true,
        usuario1,
    })
}

//RADIO - USUARIOS POR CHAT
const dRadioUC = async (req, res = response) => {
    const usuario1 = await Chat.aggregate([
        {
            // etapa $lookup
            $lookup:
            {
                from: 'usuarios', // <- nombre de la colección de donde se extrae la data
                localField: 'members', // <- nombre del campo local (post.user) que tiene la referencia a users
                foreignField: '_id', // <- nombre del campo de la colección users al que se hace la referencia
                as: 'usuario' // <- nombre del campo que almacenará el resultado (se sobreescribe post.user)
            }
        },
        // etapa $unwind
        {
            $unwind: '$usuario' // <- nombre del campo que contiene el array de objetos
        },
        // etapa $match
        // {
        //     $match: {
        //         $and: [{ fechainicio: { '$gte': new Date("2021-08-00T00:00:00.000+00:00"), '$lte': new Date("2021-11-11T23:59:59.000+00:00") } }]
        //     }
        // },
        { $group: { _id: "$usuario", "conexiones": { $sum: 1 }, } }
    ])
    res.json({
        ok: true,
        usuario1,
    })
}




//MODULOS EXPORTADOS
module.exports = {
    dCantidadU,
    dUsuariosC,
    dRadioCS,
    dRadioCE,
    dRadioCA,
    dRadioCC,
    dRadioCR,
    dRadioPU,
    dValoresPF,
    dRadioPC,
    dRadioEU,
    dValoresEF,
    dRadioEC,
    dRadioGU,
    dValoresCU,
    dRadioUC
}