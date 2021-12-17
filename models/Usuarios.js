const { Schema, model } = require('mongoose');

const UsersSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,

    },
    emailp: {
        type: String,
        required: false,

    },
    password: {
        type: String,
        required: true
    },
    segundoNombre: {
        type: String,
        required: false
    },
    apellidoPaterno: {
        type: String,
        required: false
    },
    apellidoMaterno: {
        type: String,
        required: false
    },
    area: {
        type: String,
        required: false
    },
    fono: {
        type: String,
        required: false
    },
    nacimiento: {
        type: Date,

    },
    ingreso: {
        type: Date,
        default: Date.now

    },
    rol: {
        type: String,
        required: false
    },

    permisos: [String],

    empresa: {
        type: String,
        default: 'REILAK'
    },
    cargo: {
        type: String,
        required: false

    },
    rut: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        default: 'Activo',
        required: false
    },
    imgusuario: {
        type: String,
        required: false
    },
    online: {
        type: Boolean,
        default: false
    },
    theme: {
        type: String,
        default: 'light'
    }


});

UsersSchema.method('toJSON', function() {
    const { __v, _id, ...Object } = this.toObject();
    Object.id = _id;
    return Object;
})


module.exports = model('Usuarios', UsersSchema);