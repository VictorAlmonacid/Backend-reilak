const { response } = require("express");
const { stringify } = require("uuid");
const ObjectId = require('mongoose').Types.ObjectId;
const Usuarios = require("../models/Usuarios");
const Birthday = require("../models/Cumpleaños");


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
  
  const birthday = new Birthday(req.body);
  birthday.felicitado=req.body.felicitado;
  birthday.felicitador=req.uid;
  console.log(birthday);
  try{


                
   
    birthday.felitador = req.uid;
          //  publicacion.reaccion= req.uid;
           const felitadorGuardados = await birthday.save();
            res.status(201).json({
               ok: true,
               birthday: felitadorGuardados
           })

     

      
   

  }catch(error){
      console.log(error);
      res.status(500).json({
          ok: false,
          msg: 'Hable con el administrador'
      });
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
};
