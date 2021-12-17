const {Schema, model} = require('mongoose');

const UsersSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    segundoNombre: {
        type: String,
        required: true
    },
    apellidoPaterno: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    
    fono: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    nacimiento: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true
    },
    permisos: {
        type: String,
        
    },
    empresa: {
        type: String,
        default: 'REILAK'
    },
    cargo: {
        type: String,
        required: true
       
    },
    online: {
        type: Boolean,
        default: false
    }

});


module.exports = model('User', UsersSchema);