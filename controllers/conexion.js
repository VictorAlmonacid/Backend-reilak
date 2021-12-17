const Conexion = require("../models/Conexion");
const { response } = require("express");
const ObjectId = require('mongoose').Types.ObjectId;



const lastConexion = async (req, res = response)=>{
const uid = req.params.user;
const conexion = await Conexion.findOne({"usuario":uid}).sort({"_id":-1});
res.json({
    ok: true,
    conexion
})
}


module.exports={
    lastConexion,
}