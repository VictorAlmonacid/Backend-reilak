const {Schema, model} = require('mongoose');

const ComentarioTareaSchema = Schema({

    comentario: {
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

ComentarioTareaSchema.method('toJSON', function(){
    const {__v, _id, ...Object} = this.toObject();
    Object.id = _id;
    return Object;
})


module.exports = model('ComentarioTarea', ComentarioTareaSchema);