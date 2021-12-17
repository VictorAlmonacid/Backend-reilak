const { response } = require('express');
// import moment from 'moment';
const Usuarios = require('../models/Usuarios');
const bcrypt = require('bcryptjs');
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

//LISTAR
const listarUsuarios = async(req, res = response) => {

    const usuario = await Usuarios.find()


    res.json({
        ok: true,
        usuario
    })
}

const buscarUsuarios = async(req, res = response) => {

    const usuario = await Usuarios.find()


    res.json({
        ok: true,
        usuario
    })
}

const listaCumplea単os = async(req, res = response) => {
    fecha = new Date();
    filtra = fecha.toLocaleDateString();
    console.log(filtra)
    const publicaciones = await Usuarios.findOne({ "nacimiento": /.*04-30*./ })
    console.log(publicaciones)
        // /.*0{4-30}.*/
    res.json({
        ok: true,
        publicaciones
    })
}

//CREAR
const crearUsuario = async(req, res = response) => {
    console.log("crearusaurio")
    const usuario = new Usuarios(req.body);
    console.log(usuario)
    try {
        if (req.files) {
            const { tempFilePath } = req.files.imgusuario;
            const { secure_url } = await cloudinary.uploader.upload(tempFilePath, { resource_type: "auto" });
            usuario.imgusuario = secure_url;
            const usuarioGuardado = await usuario.save();
            console.log(usuarioGuardado)
            res.json({
                ok: true,
                usuario: usuarioGuardado
            })
        } else {
            console.log("req", req.body)
            const usuarioGuardado = await usuario.save();
            console.log(usuarioGuardado)
            res.json({
                ok: true,
                usuario: usuarioGuardado
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administradorr'
        });
    }
}


const actualizarUsuario = async(req, res = response) => {
    const publicacionId = req.body.id;
    try {
        if (req.files) {
            console.log("req.files", req.files)
            const { tempFilePath } = req.files.imgusuario;
            const { secure_url } = await cloudinary.uploader.upload(tempFilePath, { resource_type: "auto" });
            const usuario = await Usuarios.findById(publicacionId);
            if (!usuario) {
                return res.status(404).json({
                    ok: false,
                    msg: 'No existe usuario con esa ID'
                })
            }
            if (usuario.imgusuario) {
                const nombreArr = usuario.imgusuario.split('/');
                const nombre = nombreArr[nombreArr.length - 1];
                const [public_id] = nombre.split('.');
                cloudinary.uploader.destroy(public_id);
            }
            if (req.body.password) {
                console.log("UserPassword", req.body.password)
                    // Encriptar contrase単a
                const salt = bcrypt.genSaltSync();
                req.body.password = bcrypt.hashSync(req.body.password, salt);
            }
            const nuevoUsuario = {
                ...req.body,
                imgusuario: secure_url
            }
            const publicacionActualizado = await Usuarios.findByIdAndUpdate(publicacionId, nuevoUsuario, { new: true });
            res.json({
                ok: true,
                usuario: publicacionActualizado
            })
        } else {
            const usuario = await Usuarios.findById(publicacionId);
            if (!usuario) {
                return res.status(404).json({
                    ok: false,
                    msg: 'No existe un usuario con esa ID'
                })
            }
            if (req.body.password) {
                console.log("UserPassword", req.body.password)
                    // Encriptar contrase単a
                const salt = bcrypt.genSaltSync();
                req.body.password = bcrypt.hashSync(req.body.password, salt);
            }
            const nuevoUsuario = {
                ...req.body,
            }
            const usuarioActualizado = await Usuarios.findByIdAndUpdate(usuario.id, nuevoUsuario, { new: true });
            res.json({
                ok: true,
                usuario: usuarioActualizado
            })
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administradora'
        })
    }
}

const eliminarUsuario = async(req, res = response) => {
    const usuarioId = req.params.id;
    try {

        const ususario = await Usuarios.findByIdAndDelete(usuarioId);
        if (!ususario) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe publicacion con esa ID'
            })
        }
        await Usuarios.findByIdAndDelete(usuarioId);

        res.json({
            ok: true,
            ususario
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administradorq'
        })
    }
}
const  listarUsuariosChat  =  async ( )  =>  {

    const  usuario  =  await  Usuarios.find ( )


    return  usuario ;
}

module.exports = {
    listarUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    listaCumplea単os,
    buscarUsuarios,
    listarUsuariosChat,
}