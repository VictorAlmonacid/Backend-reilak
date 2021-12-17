const {Schema, model} = require('mongoose');

const MessageSchema = Schema({
    from: {
        type: Schema.Types.ObjectId, 
        ref: 'Usuario',
    },
    to:{
        type: Schema.Types.ObjectId, 
        ref: 'Chat',
    },
    fecha:{
        type: Date,
        default: Date.now,
    },
    message:{
        type: String,
    },
    viewedby:[{
        type: Schema.Types.ObjectId, 
        default: [],
        ref: 'Usuario',
    }],
    
});

MessageSchema.method('toJSON', function(){
    const {__v, _id, ...Object} = this.toObject();
    Object.id = _id;
    return Object;
})


module.exports = model('Message', MessageSchema);
