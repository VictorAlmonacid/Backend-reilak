const {Schema, model} = require('mongoose');

const ChatSchema = Schema({
    name: {
        type: String,
     
    },
    img: {
        type: String,
    },
    fecha:{
        type: Date,
        default: Date.now,
    },
    descripcion:{
        type: String,
    },
    tipo:{
        type: String,
    },
    privacidad:{
        type: String,
    },
    user:{
        type: Array,
    },
    members:[{
        type: Schema.Types.ObjectId, 
        default: [],
        ref: 'Usuario',
    }],
    admin:[{
        type: Schema.Types.ObjectId, 
        default: [],
        ref: 'Usuario',
    }],
    lastmessage:[{}]
    
});

ChatSchema.method('toJSON', function(){
    const {__v, _id, ...Object} = this.toObject();
    Object.id = _id;
    return Object;
})


module.exports = model('Chat', ChatSchema);
