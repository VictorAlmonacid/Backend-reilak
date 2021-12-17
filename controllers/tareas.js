const { response } = require("express");
const Publicacion = require("../models/Posts");
const path = require("path");
const util = require("util");
const fs = require("fs");
const Reaccion = require("../models/Reaccion");
const { body } = require("express-validator");
const Tareas = require("../models/Tareas");
const ImagenTarea = require("../models/ImagenTarea");
const ComentarioTarea = require("../models/ComentarioTarea");
const { v4: uuidv4 } = require("uuid");

const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const listarTareas = async (req, res = response) => {
  const uid = req.uid;

  const tareas = await Tareas.find({ miembros: uid }).sort("estado");

  res.json({
    ok: true,
    tareas,
  });
};
const listarIamgesTareas = async (req, res = response) => {
  // console.log('a',req.body);
  // console.log('b',req.params.tarea);
  // console.log('llego a imagenes tareas')
  const imgTarea = await ImagenTarea.find({ tarea: req.params.tarea });
  res.json({
    ok: true,
    imgTarea,
  });
};
const removeImagesTareas = async (req, res = response) => {
  console.log("36 ", req.params.tarea);
  const imagenId = req.params.tarea;
  const uid = req.uid;
  console.log("39 ", req.body.id.tarea);
  try {
    const imagenRemove = await ImagenTarea.findById(imagenId);

    if (!imagenRemove) {
      return res.status(404).json({
        ok: false,
        msg: "No existe publicacion con esa ID",
      });
    }
    if (imagenRemove.usuario.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene previlegio de eliminar este evento",
      });
    }
    await ImagenTarea.findByIdAndDelete(imagenId);
    const newList = await ImagenTarea.find({ tarea: req.body.id.tarea });
    res.json({
      ok: true,
      newList,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
const listarNotificaciones = async (req, res = response) => {
  const notificacion = await Notificacion.find({
    usuario: { $ne: req.uid },
  }).sort({ fecha: -1 });

  res.json({
    ok: true,
    notificacion,
  });
};

const estadoTareas = async (req, res = response) => {
  const tareasId = req.params.id;
  console.log("body", req.body);
  const uid = req.uid;
  console.log(uid);
  console.log(tareasId);
  console.log(req.params);
  console.log("llego a actualizar publicacion controlador");
  try {
    const tareas = await Tareas.findById(tareasId);
    // console.log(publicacionId)
    if (!tareas) {
      return res.status(404).json({
        ok: false,
        msg: "No existe tarea con esa ID",
      });
    }
    if (tareas.usuario.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene previlegio de editar este evento",
      });
    }

    const nuevaTareas = {
      ...req.body,
      usuario: uid,
    };

    if (tareas.estado === false) {
      console.log("falso es");
      const tareasActualizado = await Tareas.findByIdAndUpdate(
        tareasId,
        { $set: { estado: true } },
        { new: true }
      );
      res.json({
        ok: true,
        tareas: tareasActualizado,
      });
    } else if (tareas.estado === true) {
      const tareasActualizado = await Tareas.findByIdAndUpdate(
        tareasId,
        { $set: { estado: false } },
        { new: true }
      );

      res.json({
        ok: true,
        tareas: tareasActualizado,
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const crearTareas = async (req, res = response) => {
  const tareas = new Tareas(req.body);
  try {
    tareas.usuario = req.uid;
    //  publicacion.reaccion= req.uid;
    const tareasGuardada = await tareas.save();
    res.status(201).json({
      ok: true,
      tareas: tareasGuardada,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const actualizarTareas = async (req, res = response) => {
  const tareasId = req.body.id;
  console.log("body", req.body.members);
  const uid = req.uid;
  console.log(uid);
  console.log(tareasId);
  console.log("files", req.files);
  const filesUrl = [];
  try {
    if (req.files) {
      let { tempFilePath } = req.files.multimedia;
      let { secure_url } = await cloudinary.uploader.upload(tempFilePath, {
        resource_type: "auto",
      });
      filesUrl.push(secure_url);

      console.log("url", filesUrl);

      for (let i = 0; i < filesUrl.length; i++) {
        console.log("save", filesUrl[i]);
        await Tareas.findByIdAndUpdate(
          tareasId,
          {
            $push: {
              multimedia: {
                id: uuidv4(),
                usuario: req.uid,
                fecha: new Date(),
                img: filesUrl[i],
              },
            },
          },
          { new: true }
        );
      }
      const tareasActualizado = await Tareas.findById(tareasId);
      console.log("a", tareasActualizado);
      res.json({
        ok: true,
        tareas: tareasActualizado,
      });
    } else if (req.body.comentario) {
      const tareasActualizado = await Tareas.findByIdAndUpdate(
        tareasId,
        {
          $push: {
            comentarios: {
              id: uuidv4(),
              usuario: req.uid,
              fecha: new Date(),
              comentario: req.body.comentario,
            },
          },
        },
        { new: true }
      );

      res.json({
        ok: true,
        tareas: tareasActualizado,
      });
    } else if (req.body.members) {
      console.log("llego");

      const tareasActualizado = await Tareas.findByIdAndUpdate(
        tareasId,
        { $push: { miembros: req.body.members } },
        { new: true }
      );

      res.json({
        ok: true,
        tareas: tareasActualizado,
      });
    } else {
      const tareas = await Tareas.findById(tareasId);
      // console.log(publicacionId)
      if (!tareas) {
        return res.status(404).json({
          ok: false,
          msg: "No existe tarea con esa ID",
        });
      }
      if (tareas.usuario.toString() !== uid) {
        return res.status(401).json({
          ok: false,
          msg: "No tiene previlegio de editar este evento",
        });
      }

      const nuevaTareas = {
        ...req.body,
      };

      const tareasActualizado = await Tareas.findByIdAndUpdate(
        tareasId,
        nuevaTareas,
        { new: true }
      );

      res.json({
        ok: true,
        tareas: tareasActualizado,
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const eliminarTareas = async (req, res = response) => {
  const tareasId = req.params.id;
  const uid = req.uid;
  console.log("tareasId", tareasId);
  console.log("se elimino");
  console.log(req.params);
  try {
    const tareas = await Tareas.findById(tareasId);

    if (!tareas) {
      return res.status(404).json({
        ok: false,
        msg: tareasId,
        tareasId: tareasId,
      });
    }
    if (tareas.usuario.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene previlegio de eliminar este evento",
      });
    }

    await Tareas.findByIdAndDelete(tareasId);

    res.json({
      ok: true,
      tareas,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const crearCommentTarea = async (req, res = response) => {
  const comentarioTarea = new ComentarioTarea(req.body);
  console.log("275", req.body);
  console.log("276", comentarioTarea);
  try {
    // comentarioTarea.usuario = req.uid;
    //  publicacion.reaccion= req.uid;
    const tareasGuardada = await comentarioTarea.save();
    res.status(201).json({
      ok: true,
      comentario: tareasGuardada,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
const listarComentarios = async (req, res = response) => {
  console.log("a", req.body);
  console.log("b", req.params.tarea);
  // console.log('llego a imagenes tareas')
  const comentarioTarea = await ComentarioTarea.find({
    tarea: req.params.tarea,
  });
  res.json({
    ok: true,
    comentarioTarea,
  });
};

const actualizarImagenTarea = async (req, res = response) => {
  console.log("body", req.body.data);
  console.log("pa", req.params.id);
  const idFile = req.body.data;
  const idTarea = req.params.id;

  try {
    const tareaAactualizar = await Tareas.findById(idTarea);

    for (let i = 0; i < tareaAactualizar.multimedia.length; i++) {
      await Tareas.findByIdAndUpdate(
        idTarea,
        { $pull: { multimedia: { id: idFile } } },
        { new: true }
      );
    }
    const tareasActualizado = await Tareas.findById(idTarea);
    console.log("a", tareasActualizado);
    res.json({
      ok: true,
      tareas: tareasActualizado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
module.exports = {
  listarTareas,
  crearTareas,
  actualizarTareas,
  eliminarTareas,
  estadoTareas,
  listarIamgesTareas,
  removeImagesTareas,
  crearCommentTarea,
  listarComentarios,
  actualizarImagenTarea,
};
