const { response } = require('express');
const Chat = require('../models/Chat');
const conexion = require('../models/Conexion');
const Eventos = require('../models/Eventos');
const Publicaciones = require('../models/Posts');
const usuarios = require('../models/Usuarios');
const tarea = require('../models/Tareas');


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

//RADIO - CONEXIONES POR FECHAS
const dTotalTC = async (req, res = response) => {
    console.log("req.body", req.body);
    const tiempoConexion = await conexion.aggregate([
        {
            $project: {
                _id: 0,
                fechainicio: 1,
                fechatermino: 1,
                usuario: 1,
                result: {
                    $subtract: ["$fechatermino", "$fechainicio"]
                }
            }
        },
        // etapa $match
        {
            $match: {
                $and: [{ fechainicio: { '$gte': new Date("2021-12-030T00:00:00.000+00:00"), '$lte': new Date("2022-01-01T00:00:00.000+00:00") } }]
            }
        },
        { $group: { _id: "$usuario", "tiempo": { $sum: "$result" }, } }
    ])
    res.json({
        ok: true,
        tiempoConexion,
    })
}


//Prueba - Conexiones por fechas
const dPruebaCF = async (req, res = response) => {
    console.log(req.body.start);
    const inicio = req.body.start;
    const final = req.body.end;
    const tiempoConexion = await conexion.aggregate([
        {
            $project: {
                _id: 0,
                fechainicio: 1,
                fechatermino: 1,
                usuario: 1,
                result: {
                    $subtract: ["$fechatermino", "$fechainicio"]
                },

            }
        },
        { $group: { _id: "TotalConexiones", "tiempo": { $sum: "$result" }, } }
    ])
    res.json({
        ok: true,
        tiempoConexion,
    })
}

//Valores - Cantidad Chats
const dValoresCC = async (req, res = response) => {
    const chats = await Chat.find();
    res.json({
        ok: true,
        chats,
    })
}

//Valores - Cantidad Chats
const dValoresCCP = async (req, res = response) => {
    const chats = await Chat.find({ tipo: "personal" });
    res.json({
        ok: true,
        chats,
    })
}

//Valores - Cantidad Chats
const dValoresCCG = async (req, res = response) => {
    const chats = await Chat.find({ tipo: "grupo" });
    res.json({
        ok: true,
        chats,
    })
}

//Valores - Cantidad Chats
const dValoresCCC = async (req, res = response) => {
    const chats = await Chat.find({ tipo: "canal" });
    res.json({
        ok: true,
        chats,
    })
}

//Valores - Cantidad Tareas
const dValoresCT = async (req, res = response) => {
    const tareas = await tarea.aggregate([
        {
            $lookup: {
                from: "usuarios",
                localField: "usuario",
                foreignField: "_id",
                as: "usuario",
            },
        },
        { $unwind: "$usuario" },
        // { $match: { estado: false } },
        // { $sort: { fecha: -1 } },
        // { $limit: 10 },

        {
            $project: {
                name: "$usuario.name",
                segundoNombre: "$usuario.segundoNombre",
                apellidoPaterno: "$usuario.apellidoPaterno",
                apellidoMaterno: "$usuario.apellidoMaterno",
                imgusuario: "$usuario.imgusuario",
                titulo: 1,
                contenido: 1,
                fechaCreacion: 1,
                fechaTermino: 1,
                estado: 1
            },
        },
    ]);
    res.json({
        ok: true,
        tareas,
    })
}

//Valores - Cantidad Tareas en Proceso
const dValoresCTP = async (req, res = response) => {
    const tareas = await tarea.aggregate([
        {
            $lookup: {
                from: "usuarios",
                localField: "usuario",
                foreignField: "_id",
                as: "usuario",
            },
        },
        { $unwind: "$usuario" },
        { $match: { estado: false } },
        { $match: { fechaTermino: { '$gte': new Date() } } },
        // { $sort: { fecha: -1 } },
        // { $limit: 10 },

        {
            $project: {
                name: "$usuario.name",
                segundoNombre: "$usuario.segundoNombre",
                apellidoPaterno: "$usuario.apellidoPaterno",
                apellidoMaterno: "$usuario.apellidoMaterno",
                imgusuario: "$usuario.imgusuario",
                titulo: 1,
                contenido: 1,
                fechaCreacion: 1,
                fechaTermino: 1,
                estado: 1
            },
        },
    ]);
    res.json({
        ok: true,
        tareas,
    })
}

//Valores - Cantidad Tareas Atrasadas
const dValoresCTA = async (req, res = response) => {
    const tareas = await tarea.aggregate([
        {
            $lookup: {
                from: "usuarios",
                localField: "usuario",
                foreignField: "_id",
                as: "usuario",
            },
        },
        { $unwind: "$usuario" },
        { $match: { estado: false } },
        { $match: { fechaTermino: { '$lt': new Date() } } },
        // { $sort: { fecha: -1 } },
        // { $limit: 10 },

        {
            $project: {
                name: "$usuario.name",
                segundoNombre: "$usuario.segundoNombre",
                apellidoPaterno: "$usuario.apellidoPaterno",
                apellidoMaterno: "$usuario.apellidoMaterno",
                imgusuario: "$usuario.imgusuario",
                titulo: 1,
                contenido: 1,
                fechaCreacion: 1,
                fechaTermino: 1,
                estado: 1
            },
        },
    ]);
    res.json({
        ok: true,
        tareas,
    })
}

//Valores - Cantidad Tareas Completadas
const dValoresCTC = async (req, res = response) => {
    const tareas = await tarea.aggregate([
        {
            $lookup: {
                from: "usuarios",
                localField: "usuario",
                foreignField: "_id",
                as: "usuario",
            },
        },
        { $unwind: "$usuario" },
        { $match: { estado: true } },
        // { $sort: { fecha: -1 } },
        // { $limit: 10 },

        {
            $project: {
                name: "$usuario.name",
                segundoNombre: "$usuario.segundoNombre",
                apellidoPaterno: "$usuario.apellidoPaterno",
                apellidoMaterno: "$usuario.apellidoMaterno",
                imgusuario: "$usuario.imgusuario",
                titulo: 1,
                contenido: 1,
                fechaCreacion: 1,
                fechaTermino: 1,
                estado: 1
            },
        },
    ]);
    res.json({
        ok: true,
        tareas,
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
    dRadioUC,
    dTotalTC,
    dPruebaCF,
    dValoresCC,
    dValoresCT,
    dValoresCCP,
    dValoresCCG,
    dValoresCCC,
    dValoresCTP,
    dValoresCTA,
    dValoresCTC
}