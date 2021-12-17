const { response } = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require("../models/Usuarios");
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'Un usuario existe con ese correo'
      })
    }

    usuario = new Usuario(req.body);

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    // Generar nuestro JWT
    const token = await generarJWT(usuario.id, usuario.name);

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    })
  }
};

const loginUsuario = async(req, res = response ) => {
  console.log('se conecto movil')
    const { email, password } = req.body;

    try {
        
        const usuario = await Usuario.findOne({ email });

        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.name);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,

            
             email: usuario.email,
             segundoNombre: usuario.segundoNombre,
             apellidoPaterno: usuario.apellidoPaterno,
             apellidoMaterno: usuario.apellidoMaterno,
             area: usuario.area,
             fono: usuario.fono,
             nacimiento:  usuario.nacimiento,
             ingreso: usuario.ingreso,
             rol: usuario.rol,
             permisos: usuario.permisos,
             empresa:  usuario.empresa,
             cargo: usuario.cargo,
             rut: usuario.rut,
             imgusuario: usuario.imgusuario,
             theme:usuario.theme,
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const revalidarToken = async (req, res = response) => {
// console.log(req)
  const { uid, name } = req;
  // Generar nuestro JWT
  const token = await generarJWT(uid, name);
  const usuario = await Usuario.findById( uid );

  res.json({
    ok: true,
    uid,
    name,
    email: usuario.email,
    segundoNombre: usuario.segundoNombre,
    apellidoPaterno: usuario.apellidoPaterno,
    apellidoMaterno: usuario.apellidoMaterno,
    area: usuario.area,
    fono: usuario.fono,
    nacimiento:  usuario.nacimiento,
    ingreso: usuario.ingreso,
    rol: usuario.rol,
    permisos: usuario.permisos,
    empresa:  usuario.empresa,
    cargo: usuario.cargo,
    rut: usuario.rut,
    imgusuario: usuario.imgusuario,
    theme:usuario.theme,
    token


  });
};
const changeTheme =  async(req,res=response)=>{

  const uid = req.params.uid;
  try{
          const useTheme = await Usuario.findById(uid);
          if(!useTheme){
              return res.status(404).json({
                  ok: false,
                  msg: 'No existe publicacion con esa ID',
              })
          }
  if(useTheme.theme==="light"){
      const themeUpdate = await Usuario.findByIdAndUpdate(uid, {$set:{theme:'dark'}}, {new: true});
      res.json({
          ok: true,
          theme: themeUpdate
      })
  }else{
      const themeUpdate = await Usuario.findByIdAndUpdate(uid, {$set:{theme:'light'}}, {new: true});
      res.json({
          ok: true,
          theme: themeUpdate
      })
  }
  }catch(error){
      res.status(500).json({
          ok:false,
          msg: 'Hable con el administrador'
      })
  }
}

const getPassword = async (req,res=response)=>{

}


module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
  getPassword,
  changeTheme,
};