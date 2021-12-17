  
const { response } = require('express');
// import moment from 'moment';
const Usuarios = require('../models/Usuarios');

const filtrarUsuarios = async(req, res = response) => {

    console.log(req.params.estado)
    const usuario = req.params.estado;

    if (usuario == "Activo") {
        const estadoBuscado = await Usuarios.find({ estado: 'Activo' });
        res.json({
            ok: true,
            estadoBuscado
        })
    } else if (usuario == "Inactivo") {
        const estadoBuscado = await Usuarios.find({ estado: 'Inactivo' });
        res.json({
            ok: true,
            estadoBuscado
        })
    } else {
        const estadoBuscado = await Usuarios.find();
        res.json({
            ok: true,
            estadoBuscado
        })
    }
}

const filtrarPorRol = async(req, res = response) => {

    console.log(req.params.rol)
    const usuario = req.params.rol;

    if (usuario == "Colaborador") {
        const estadoBuscado = await Usuarios.find({ rol: 'Colaborador' });
        res.json({
            ok: true,
            estadoBuscado
        })
    } else if (usuario == "Jefatura") {
        const estadoBuscado = await Usuarios.find({ rol: 'Jefatura' });
        res.json({
            ok: true,
            estadoBuscado
        })
    } else if (usuario == "Administrador") {
        const estadoBuscado = await Usuarios.find({ rol: 'Administrador' });
        res.json({
            ok: true,
            estadoBuscado
        })
    } else {
        const estadoBuscado = await Usuarios.find();
        res.json({
            ok: true,
            estadoBuscado
        })
    }
}

const busquedaUsuario = async(req, res = response) => {

    console.log(req.params.buscar)
    const usuario = req.params.buscar;

    const estadoBuscado = await Usuarios.find({ rut: { $regex: '.*' + usuario + '.*' } });
    res.json({
        ok: true,
        estadoBuscado
    })

}

module.exports = {
    filtrarUsuarios,
    filtrarPorRol,
    busquedaUsuario
}