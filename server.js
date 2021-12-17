const express = require('express');
const socketio = require('socket.io');
const http     = require('http');
const path     = require('path');

const cors = require('cors');
require('dotenv').config();

const { dbConnection } = require('./database/config');

const socketIo = require("socket.io");
const fileUpload = require('express-fileupload')

const Sockets  = require('./models/Sockets.js');


class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT
        // Base de datos
        dbConnection();
        // Http server
        this.server = http.createServer( this.app );
        // Configuraciones de sockets
        this.io = socketio( this.server, { /* configuraciones */ } );
    }

    middlewares(){
        // Desplegar el directorio público
        this.app.use( express.static('./public') );

        // CORS
        this.app.use( cors() );

        // Parseo del body
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(express.json());

        // Fileupload - Carga de archivos
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

        // API End Points
        this.app.use('/api/auth', require('./routers/auth'));
        this.app.use('/api/posts', require('./routers/posts'));
        this.app.use('/api/user', require('./routers/users'));
        this.app.use('/api/reaccion', require('./routers/reaccion'));
        this.app.use('/api/tareas', require('./routers/tareas'));
        this.app.use('/api/getPassword', require('./routers/getPassword'));
        this.app.use('/api/birthday', require('./routers/cumpleanos'));
        this.app.use('/api/birthday/message', require('./routers/cumpleanos'));
        this.app.use('/api/event', require('./routers/events'));
        this.app.use('/api/filtros', require('./routers/filtros'));
        this.app.use('/api/correo', require('./routers/correo'));
        this.app.use('/api/chat', require('./routers/chat'));
        this.app.use('/api/multimedias', require('./routers/multimedias'));
        this.app.use('/api/conexion', require('./routers/conexion'));
        this.app.use('/api/dashboard', require('./routers/dashboard'));
 

    }

    // Esta configuración se puede tener aquí o como propieda de clase
    // depende mucho de lo que necesites
    configurarSockets() {
        new Sockets( this.io );
    }

    execute(){

        // Inicializar Middlewares
        this.middlewares();   

        // Inicializar sockets
        this.configurarSockets();

        // Inicializar Server
        this.server.listen( this.port, () => {
            console.log('Server corriendo en puerto:', this.port );
        });
    }

}

module.exports = Server;