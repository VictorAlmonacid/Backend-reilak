const {Schema, model} = require('mongoose');

const imagenTareaSchema = Schema({

    multimedia: {
        type: String,
    },
    fecha:{
        type: Date,
        default: Date.now
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    tarea:{
        type: Schema.Types.ObjectId,
        ref: 'Tarea'
    },
 
});

imagenTareaSchema.method('toJSON', function(){
    const {__v, _id, ...Object} = this.toObject();
    Object.id = _id;
    return Object;
})


module.exports = model('ImagenTarea', imagenTareaSchema);