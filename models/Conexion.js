const {Schema, model} = require('mongoose');

const ConexionSchema = Schema({

    fechainicio:{
        type: Date,
        default: Date.now,
    },
    fechatermino:{
        type: Date,
        default: Date.now,
        
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },

    
});

ConexionSchema.method('toJSON', function(){
    const {__v, _id, ...Object} = this.toObject();
    Object.id = _id;
    return Object;
})


module.exports = model('Conexion', ConexionSchema);
