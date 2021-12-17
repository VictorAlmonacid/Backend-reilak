const {Schema, model} = require('mongoose');

const TareasSchema = Schema({
    titulo: {
        type: String,
        required: true
    },
    contenido: {
        type: String,
    
    },

    fechaTermino:{
        type: Date, 
        required: true
    },
    miembros:[{
        type: Schema.Types.ObjectId, 
        default: [],
        ref: 'Usuario',
    }],
    multimedia: {
        type: Array,
        
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    estado: {
        type: Boolean,
       default:  false
    },
    comentarios:[{}],
    fechaCreacion:{
        type: Date, 
        default: Date.now,
    },

});




module.exports = model('Tareas', TareasSchema);