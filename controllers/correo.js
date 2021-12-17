const { response } = require("express");
const nodemailer = require("nodemailer");
//const jwt = require("jsonwebtoken");

const Usuario = require("../models/Usuarios");
const { generarJWT } = require('../helpers/jwt');

const enviarCorreo = async (req, res = response) => {
    const {  email } = req.body;
    console.log(req.body);
    console.log("gggggaaaaa", email)

    let correo = await Usuario.findOne({ email });
    console.log(correo);

    

  
    if (!correo) {
       return res.status(400).json({
         ok: false,
         msg: 'Correo no existe'
       })
     }
     /*
      const emailToken = jwt.sign(
          {
            correo: _.pick(correo, 'id'),
         },
         EMAIL_SECRET,
           {
            expiresIn: '1d',
          }, 
      );
*/
const token = await generarJWT(correo.name, correo.id);
     
    
      contentHTML = `
 
      <!doctype html>
      <html lang="en-US">
      
      <head>
      
          <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
          <title>Reset Password Email Template</title>
          <meta name="description" content="Reset Password Email Template.">
          <style type="text/css">
              a:hover {text-decoration: underline !important;}
          </style>
      </head>
      
      <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
          <!--100% body table-->
          <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
              style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
              <tr>
                  <td>
                      <table style="background-color: black; max-width:670px;  margin:0 auto;" width="100%" border="0"
                          align="center" cellpadding="0" cellspacing="0">
                          <tr>
                              <td style="height:80px;">&nbsp;</td>
                          </tr>
                          <tr>
                              <td style="text-align:center;">
                                <a href="http://localhost:3000/login" title="logo" target="_blank">
                                  <img width="60" src="https://i.ibb.co/hL4XZp2/android-chrome-192x192.png" title="logo" alt="logo">
                                </a>
                              </td>
                          </tr>
                          <tr>
                              <td style="height:20px;">&nbsp;</td>
                          </tr>
                          <tr>
                              <td>
                                  <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                      style="max-width:670px;background:#191C1C; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                      <tr>
                                          <td style="height:40px;">&nbsp;</td>
                                      </tr>
                                      <tr>
                                          <td style="padding:0 35px;">
                                              <h1 style="color:white; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;"> Recuperacion de Contraseña</h1>
                                              <span
                                                  style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                              <p style="color:white; font-size:15px;line-height:24px; margin:0;">
       Saludos ${correo.name}, usted a solicitado una recuperacion de contraseña, ya se que se olvido de su contraseña o desea cambiarla por seguridad. Simplemente haga click en recuperar contraseña y se le dirigira a la pagina donde debera ingresar su nueva contraseña.
                                              </p>
                                            <br />
                                                                                          <p style="color:white; font-size:15px;line-height:24px; margin:0;">
                                            
                                            
   En el caso de que aun no haya camniado su contraseña, el presente enlace tiene una duracion maxima de 2 horas una vez finalizado este tiempo debera solicitar un nuevo restablecimiento de contraseña.
                                              </p>
                                              
                                              
                                              <a href="http://localhost:3000/getPassword2/?access_token=${token}"
                                                  style="background:blue;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">  Recuperar contraseña</a>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td style="height:40px;">&nbsp;</td>
                                      </tr>
                                  </table>
                              </td>
                          <tr>
                              <td style="height:20px;">&nbsp;</td>
                          </tr>
                          <tr>
                              <td style="text-align:center;">
                                  <p style="font-size:14px; color:white; line-height:18px; margin:0 0 0;  text-decoration: none;">&copy; <strong style=" text-decoration: none; color:white;">www.reilak.cl</strong></p>
                              </td>
                          </tr>
                          <tr>
                              <td style="height:80px;">&nbsp;</td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
          <!--/100% body table-->
      </body>
      
      </html>
      
  `;


          // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port:465,
        secure: true,
        
       // secure: false, // true for 465, false for other ports
        auth: {
          user: "gerencia.reilak@gmail.com", // generated ethereal user
          pass: "fizpckkdweamybtp", // generated ethereal password
        },        tls: {
          rejectUnauthorized: false
      }
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: "gerencia.reilak@gmail.com", // sender address,
        to: email,
        subject: 'Cambio de contraseña',
        html: contentHTML
        
    })

    
      return res.status(200).json({
        ok: true,
        msg: 'Correo  existe'
      })
    




  
 
  };




  module.exports = {
    enviarCorreo,

  };