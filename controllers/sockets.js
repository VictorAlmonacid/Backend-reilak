const Usuario = require('../models/Usuarios');
const {response} = require('express');
const Chat = require('../models/Chat');
const Message = require('../models/Message');
const ObjectId = require('mongoose').Types.ObjectId;
const Conexion = require('../models/Conexion');

// const Mensaje = require('../models/mensaje');

const usuarioConectado = async( uid ) => {
    const usuario = await Usuario.findById(uid);
    
    // usuario.online = true;
    await Usuario.findByIdAndUpdate(uid, {$set:{online:true}}, {new: true});
    // await usuario.save();
    

    return usuario;
}
const iniciarConexion = async(uid)=>{
    const conexion = new Conexion( ObjectId(uid) );
    conexion.usuario=uid;
    await conexion.save();

    return conexion
}
const findUsuariosConectados = async(uid)=>{
    console.log(uid);
    const usuario = await Usuario.find({online:true});
    return usuario;
}
const usuarioDesconectado = async( uid ) => {
    const usuario = await Usuario.findById(uid);

    // usuario.online = true;
    await Usuario.findByIdAndUpdate(uid, {$set:{online:false}}, {new: true});
    // await usuario.save();
    
    return usuario;
}
const terminarConexion = async(uid)=>{
    const conexion = await Conexion.findOne({"usuario":ObjectId(uid)}).sort({"_id":-1});
   
    conexion.fechatermino=Date.now();
    await Conexion.findByIdAndUpdate(conexion._id, conexion, {new: true},);
    
    return conexion
}
const getNotificacion = async()=>{

}


const getUsuarios = async() => {

    const usuarios = await Chat.aggregate([
    {
      $lookup: {
        from: "usuarios",
        localField: "members",
        foreignField: "_id",
        as: "miembros",
      },
    },
    { $unwind: "$miembros" },
    // { $match: { _id: ObjectId(idChat) } },
    { $sort: { "miembros.online": -1 } },
    {
      $project: {
        name: "$miembros.name",
        segundoNombre: "$miembros.segundoNombre",
        apellidoPaterno: "$miembros.apellidoPaterno",
        apellidoMaterno: "$miembros.apellidoMaterno",
        imgusuario: "$miembros.imgusuario",
        admin: 1,
        idusuario: "$miembros._id",
        online: "$miembros.online",
      },
    },
  ]);
    
    return usuarios;
}

const grabarSala = async( payload ) => {
    try {
        if(payload.data===undefined){
            const sala = new Chat( payload.data );
            sala.tipo="personal";
            sala.members.push(payload.from);
            sala.members.push(payload.to)
            const messag = new Message();
              messag.message="Mensaje enviado";
              messag.fecha=Date.now();
              await messag.save();
              sala.lastmessage=messag;
            await sala.save();
            return sala;
        }
            const sala = new Chat( payload.data );
            console.log('payload', payload);

            if(payload.data.tipo==="grupo"){
              const messag = new Message();
              messag.message="Grupo creado";
              messag.fecha=Date.now();
              await messag.save();
              sala.lastmessage=messag;
            }
            if(payload.data.tipo==="canal"){
              const messag = new Message();
              messag.message="Canal creado";
              messag.fecha=Date.now();
              await messag.save();
              sala.lastmessage=messag;
            }


            await sala.save();
            return sala;





    } catch (error) {
        console.log(error);
        return false;
    }

}
const grabarMessage = async( payload ) => {
    
    try {
        const message = new Message( payload );
        await message.save();
        await Chat.findByIdAndUpdate(message.to,{'$set':{'lastmessage':message}},{new:true})
       const userMessage = await Message.aggregate(
            [
              {
                $lookup:
                  {
                    from: 'usuarios',
                    localField: 'from',
                    foreignField: '_id',
                    as: 'userMessage'
                  }
             },
             {$unwind:"$userMessage"},
             { $match : { _id: ObjectId(message._id)} }, 
        
             {
                 $project: 
                   {
                        name : '$userMessage.name',
                        segundoNombre : '$userMessage.segundoNombre',
                        apellidoPaterno : '$userMessage.apellidoPaterno',
                        apellidoMaterno : '$userMessage.apellidoMaterno',
                        imgusuario : '$userMessage.imgusuario',
                        viewedby: 1,
                        to:1,
                        from:1,
                        message:1,
                        fecha:1,
                    }
            },
        
            ]
          )
          userMessage.map(()=>{})
        return userMessage;

    } catch (error) {
        console.log(error);
        return false;
    }

}

const findMembers = async(payload)=>{
    const sala = await Chat.findById(payload);
    return sala;
}

const AddMembersChat = async(payload)=>{
  const member = await Chat.findByIdAndUpdate(payload.data.chatId, {$push:{members:payload.data.members}}, {new: true});
  return member;
}
const readMessage = async(payload)=>{
  console.log('hpy: ', payload);
  const messageNoRead = await Message.find({$and:[{'to':payload.data.id.id},{"viewedby._id":{$ne:ObjectId(payload.data.uid)}}]});
    for(let i=0;i<messageNoRead.length;i++){
      await Message.findByIdAndUpdate(messageNoRead[i]._id, {$push:{viewedby:{_id:payload.data.uid, fecha: new Date()}}}, {new: true});
    }
    const message = await Message.find({'to':payload.data.id.id}).limit(1).sort({"_id":-1});
    const act = await Chat.findByIdAndUpdate(payload.data.id.id,{'$set':{'lastmessage':message}},{new:true});
    return act;
}

module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    getUsuarios,
     grabarSala,
     findMembers,
     grabarMessage,
     iniciarConexion,
     terminarConexion,
     findUsuariosConectados,
     AddMembersChat,
     readMessage,

}