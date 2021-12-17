const {Schema, model} = require('mongoose');

const PostSchema = Schema({
    titulo: {
        type: String,
        required: true
    },
    contenido: {
        type: String,
    },
    categoria: {
        type: String,
        default: 'Noticia',
    },
    multimedia: {
        type: Array,
    },
    fecha:{
        type: Date,
        default: Date.now
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    reaccion:[{
        type: Schema.Types.ObjectId, 
        default: [],
        ref: 'Usuario',
    }],
});

PostSchema.method('toJSON', function(){
    const {__v, _id, ...Object} = this.toObject();
    Object.id = _id;
    return Object;
})


module.exports = model('Publicacion', PostSchema);
