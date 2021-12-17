const { response } = require("express");
const Chat = require("../models/Chat");
const Message = require("../models/Message");
const ObjectId = require("mongoose").Types.ObjectId;
const cloudinary = require("cloudinary").v2;
const Usuarios = require("../models/Usuarios");
cloudinary.config(process.env.CLOUDINARY_URL);

const listarChat = async (req, res = response) => {
  const uid = req.uid;
  let chat = await Chat.find({ members: uid }).sort({
    "lastmessage.fecha": -1,
  });

  for (let i = 0; i < chat.length; i++) {
    if (chat[i].tipo === "personal") {
      for (let j = 0; j < chat[i].members.length; j++) {
        if (JSON.stringify(chat[i].members[j]) !== JSON.stringify(uid)) {
          const user = await Usuarios.findById(chat[i].members[j]);
          chat[i].user = user;
        }
      }
    }
  }

  res.json({
    ok: true,
    chat,
  });
};
const buscarChat = async (payload) => {
  console.log("ver ", payload);
  const chat = await Chat.findById(payload.to);

  return chat;
};
const findUserChatPersonal = async (payload) => {
  const userPersonal = await Usuarios.findById(payload.to);
  return userPersonal;
};
const findMeUserChat = async (payload) => {
  const meUserChat = await Usuarios.findById(payload.from);
  return meUserChat;
};
const listarMessage = async (req, res = response) => {
  const sala = req.params.chat;
  const message = await Message.aggregate([
    {
      $lookup: {
        from: "usuarios",
        localField: "from",
        foreignField: "_id",
        as: "userMessage",
      },
    },
    { $unwind: "$userMessage" },
    { $match: { to: ObjectId(sala) } },
    { $sort: { fecha: -1 } },
    { $limit: 10 },

    {
      $project: {
        name: "$userMessage.name",
        segundoNombre: "$userMessage.segundoNombre",
        apellidoPaterno: "$userMessage.apellidoPaterno",
        apellidoMaterno: "$userMessage.apellidoMaterno",
        imgusuario: "$userMessage.imgusuario",
        viewedby: 1,
        to: 1,
        from: 1,
        message: 1,
        fecha: 1,
      },
    },
  ]);
  res.json({
    ok: true,
    message,
  });
};
const listarImagesChat = async (req, res = response) => {
  const sala = req.params.chat;

  const message = await Message.find({
    $and: [
      {
        $or: [
          {
            message: { $regex: ".jpg" },
          },
          {
            message: { $regex: ".png" },
          },
          {
            message: { $regex: ".jpge" },
          },
          {
            message: { $regex: ".gif" },
          },
        ],
      },
      { to: sala },
    ],
  });

  res.json({
    ok: true,
    message,
  });
};
const listarVideosChat = async (req, res = response) => {
  const sala = req.params.chat;

  const message = await Message.find({
    $and: [
      {
        $or: [
          {
            message: { $regex: ".mp4" },
          },
        ],
      },
      { to: sala },
    ],
  });

  res.json({
    ok: true,
    message,
  });
};

const removerUserChat = async (req, res = response) => {
  const chatId = req.body.idChat;
  const uid = req.body.user;

  try {
    const publicacion = await Chat.findById(chatId);

    if (!publicacion) {
      return res.status(404).json({
        ok: false,
        msg: "No existe publicacion con esa ID",
      });
    }

    const chatUser = await Chat.findByIdAndUpdate(
      chatId,
      { $pull: { members: uid } },
      { new: true }
    );
    res.json({
      ok: true,
      miembro: chatUser,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
const addUserChat = async (req, res = response) => {
  const chatId = req.body._id;
  const uid = req.body.idusuario;

  try {
    const publicacion = await Chat.findById(chatId);

    if (!publicacion) {
      return res.status(404).json({
        ok: false,
        msg: "No existe publicacion con esa ID",
      });
    }

    const chatUser = await Chat.findByIdAndUpdate(
      chatId,
      { $push: { members: uid } },
      { new: true }
    );
    res.json({
      ok: true,
      miembro: chatUser,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
const listarMiembrosView = async (req, res = response) => {
  const sala = req.params.chat;
  const miembros = await Chat.aggregate([
    {
      $lookup: {
        from: "usuarios",
        localField: "members",
        foreignField: "_id",
        as: "miembros",
      },
    },
    { $unwind: "$miembros" },
    { $match: { _id: ObjectId(sala) } },

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

  res.json({
    ok: true,
    miembros,
  });
};

const listarNoMiembros = async (req, res = response) => {
  const sala = req.params.chat;
  const miembros = await Chat.aggregate([
    {
      $lookup: {
        from: "usuarios",
        localField: "members",
        foreignField: "_id",
        as: "miembros",
      },
    },
    { $unwind: "$miembros" },
    { $match: { _id: { $not: { $gt: sala } } } },

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

  res.json({
    ok: true,
    miembros,
  });
};

const listarMiembros = async (payload) => {
  let idChat;
  if (payload.uid) {
    idChat = payload.uid;
  } else {
    idChat = payload;
  }

  const miembros = await Chat.aggregate([
    {
      $lookup: {
        from: "usuarios",
        localField: "members",
        foreignField: "_id",
        as: "miembros",
      },
    },
    { $unwind: "$miembros" },
    { $match: { members: ObjectId(idChat) } },
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

  return miembros;
  // res.json({
  //   ok: true,
  //   miembros,
  // });
};

module.exports = {
  listarChat,
  listarMessage,
  listarMiembros,
  buscarChat,
  findUserChatPersonal,
  findMeUserChat,
  listarImagesChat,
  listarVideosChat,
  listarMiembrosView,
  listarNoMiembros,
  removerUserChat,
};
