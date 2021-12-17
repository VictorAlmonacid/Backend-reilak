const {Schema, model} = require('mongoose');

const NotificacionSchema = Schema({

    descripcion: {
        type: String,
    },
    tipo: {
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
    vistopor:[{
        type: Schema.Types.ObjectId, 
        default: [],
        ref: 'Usuario',
    }],

});

NotificacionSchema.method('toJSON', function(){
    const {__v, _id, ...Object} = this.toObject();
    Object.id = _id;
    return Object;
})


module.exports = model('Notificacion', NotificacionSchema);
