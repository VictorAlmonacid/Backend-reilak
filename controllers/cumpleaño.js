const { response } = require("express");
const { stringify } = require("uuid");
const ObjectId = require('mongoose').Types.ObjectId;
const Usuarios = require("../models/Usuarios");
const Birthday = require("../models/Cumpleaños");
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const listarCumpleañeros = async (req, res = response) => {
  const uid = req.uid;

  var next30days = [];
  var today = Date.now();
  var oneday = 1000 * 60 * 60 * 24;
  var in30days = Date.now() + oneday;

  //  make an array of all the month/day combos for the next 30 days
  for (var i = today; i < in30days; i = i + oneday) {
    var thisday = new Date(i);
    next30days.push({
      m: thisday.getMonth() + 1,
      d: thisday.getDate(),
    });
  }

  let birthdays;
  const birthday = await Usuarios.aggregate([
    {
      $project: {
        m: { $month: "$nacimiento" },
        d: { $dayOfMonth: "$nacimiento" },
      },
    },
    {
      $match: {
        $or: next30days,
      },
    },
    {
      $group: {
        _id: {
          month: "$m",
          day: "$d",
        },
        userids: { $push: "$_id" },
      },
    },
  ]);

if(birthday.length>0){
  for (let i = 0; i < birthday.length; i++) {
    birthdays = birthday[i].userids.toString();
  }

  const newArr = await Usuarios.find()
    .select("name segundoNombre apellidoPaterno apellidoMaterno imgusuario")
    .where("_id")
    .in(birthdays.split(","))
    .exec();
  const users = newArr.filter((x) => x.id != uid);

  res.json({
    ok: true,
    users,
  });
};
}



const createBirthday = async(req, res= response) => {

  console.log('bod: ', req.body);
  console.log('fil: ',req.files);
  
  const birthday = new Birthday(req.body);
  birthday.felicitado=req.body.felicitado;
  birthday.felicitador=req.uid;
  const filesUrl = [];
  try{

    if (req.files) {

      if(req.files.multimedia.length > 1){
          for (let i = 0; i < req.files.multimedia.length; i++) {
              let {tempFilePath} = req.files.multimedia[i];
              let {secure_url} = await cloudinary.uploader.upload(tempFilePath, { resource_type: "auto" });
              filesUrl.push(secure_url);
          }
      }else{
          let {tempFilePath} = req.files.multimedia;
          let {secure_url} = await cloudinary.uploader.upload(tempFilePath, { resource_type: "auto" });
          filesUrl.push(secure_url);
      }



      birthday.felitador = req.uid;
      birthday.multimedia = filesUrl;
      //  publicacion.reaccion= req.uid;
       const felitadorGuardados = await birthday.save();
        res.status(201).json({
           ok: true,
           birthday: felitadorGuardados
       });


  }else{
    birthday.felitador = req.uid;
    //  publicacion.reaccion= req.uid;
     const felitadorGuardados = await birthday.save();
      res.status(201).json({
         ok: true,
         birthday: felitadorGuardados
     });
  }
  }catch(error){
      console.log(error);
      res.status(500).json({
          ok: false,
          msg: 'Hable con el administrador'
      });
  }

}

const changeViewedBirthday = async (req, res = response) => {

  const birthdayId = req.body.post?req.body.post:req.params.id;
  try{
      const messageBirthday = await Birthday.findByIdAndUpdate(birthdayId, {visto: true}, {new: true});
      res.json({
          ok: true,
          messageBirthday
      })
  }catch(error){
      res.status(500).json({
          ok:false,
          msg: 'Hable con el administrador'
      })
  }
}

const listarMessageBirthday = async (req, res = response) => {
  const uid = req.uid;


  var next30days = [];
  var today = Date.now();
  var oneday = 1000 * 60 * 60 * 24;
  var in30days = Date.now() + oneday;

  //  make an array of all the month/day combos for the next 30 days
  for (var i = today; i < in30days; i = i + oneday) {
    var thisday = new Date(i);
    next30days.push({
      m: thisday.getMonth() + 1,
      d: thisday.getDate(),
    });
  }
  const messageBirthday = await Birthday.aggregate(
    [
      {
        $lookup:
          {
            from: 'usuarios',
            localField: 'felicitador',
            foreignField: '_id',
            as: 'userFelicitador'
          }
     },
     {$unwind:"$userFelicitador"},
     { $match : { felicitado: ObjectId(uid)} }, 
     { $match : { visto: false }}



    ]
  ) 

 console.log(messageBirthday);
// console.log(birth);
  res.json({
    ok: true,
    messageBirthday
  });
};

module.exports = {
  listarCumpleañeros,
  createBirthday,
  listarMessageBirthday,
  changeViewedBirthday,
};
