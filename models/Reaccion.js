const {Schema, model} = require('mongoose');

const ReaccionSchema = Schema({
    publicacion: {
        type: Schema.Types.ObjectId,
        ref: 'Publicacion'
    },
 
    usuario:[{
        type: Schema.Types.ObjectId, 
        default: [],
        ref: 'Usuario',
    }],
});

// PostSchema.method('toJSON', function(){
//     const {__v, _id, ...Object} = this.toObject();
//     Object.id = _id;
//     return Object;
// })


module.exports = model('Reaccion', ReaccionSchema);
