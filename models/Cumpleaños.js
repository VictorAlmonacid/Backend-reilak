const {Schema, model} = require('mongoose');

const BirthdaySchema = Schema({


    fecha:{
        type: Date,
        default: Date.now
    },
    message:{
        type: String,
        required: true,
    },

    felicitador:{
        type: Schema.Types.ObjectId, 
        ref: 'Usuario',
    },
    felicitado:{
        type: Schema.Types.ObjectId, 
        ref: 'Usuario',
    },
    multimedia: {
        type: Array,
    },
    visto: {
        type: Boolean,
        default: false
    }

});

BirthdaySchema.method('toJSON', function(){
    const {__v, _id, ...Object} = this.toObject();
    Object.id = _id;
    return Object;
})


module.exports = model('Birthday', BirthdaySchema);
