const { comprobarJWT } = require('../helpers/jwt');
const fs = require('fs');
const { usuarioConectado,
    usuarioDesconectado,
    grabarSala,
    getUsuarios,
    findMembers,
    grabarMessage,
    iniciarConexion,
    terminarConexion,
    findUsuariosConectados,
    AddMembersChat,
    readMessage,
} = require('../controllers/sockets'); const { listarNotificaciones } = require('../controllers/posts');
const { listarChat, findMeUserChat, listarMiembros } = require('../controllers/chat');
const { buscarChat } = require('../controllers/chat');
const { findUserChatPersonal } = require('../controllers/chat');
const { listarUsuarios, listarUsuariosChat } = require('../controllers/usuarios');
class Sockets {

    constructor(io) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async (socket) => {
            const [valido, uid] = comprobarJWT(socket.handshake.query['x-token'])

            if (!valido) {
                console.log('socket no identificado');
                return socket.disconnect();
            }
            await usuarioConectado(uid);
            await iniciarConexion(uid);
            const user = await findUsuariosConectados(uid);
            for (let i = 0; i < user.length; i++) {
                this.io.to(user[i]._id.toString()).emit('send-activo', user);
            }

            // TODO: Emitir todos los usuarios conectados

            // TODO: Emitir todos los usuarios conectados
            this.io.emit( 'lista-cambios-usuarios', await getUsuarios() )
    

            socket.on('lista-usuarios', async(payload)=>{
                const listaUser = await listarMiembros(payload);
                const users = await listarUsuariosChat();
                
                for (let i = 0; i < users.length; i++) {
                    
                    this.io.to(users[i]._id.toString()).emit('lista-usuarios-activo', listaUser);
                }
            })


            // Unir al usuario a una sala de socket.io
            socket.join(uid);

            socket.on('create-sala-chat', async (payload) => {
                const chat = await grabarSala(payload);


                for (let i = 0; i < chat.members.length; i++) {

                    this.io.to(chat.members[i].toString()).emit('create-sala-chat', chat);
                }
            });

            socket.on('send-message', async (payload) => {
                const chatExist = await buscarChat(payload)
                if (!chatExist) {
                    let chat = await grabarSala(payload);
                    
                    const userPersonalChat = await findUserChatPersonal(payload);
                    const meUserChat = await findMeUserChat(payload);

                    for (let i = 0; i < chat.members.length; i++) {
                        if (userPersonalChat._id.toString() === chat.members[i].toString()) {

                            chat[["user"]] = meUserChat;
                            this.io.to(chat.members[i].toString()).emit('create-sala-chat', chat);
                        } else {
                            chat[["user"]] = userPersonalChat;
                            this.io.to(chat.members[i].toString()).emit('create-sala-chat', chat);
                        }

                    }


                    payload["to"] = chat._id;
                    const message = await grabarMessage(payload);

                    const chatMember = await findMembers(message[0].to);

                    for (let i = 0; i < chatMember.members.length; i++) {
                        this.io.to(chatMember.members[i].toString()).emit('send-message', message[0]);
                    }
                }
                else {
        
                    const message = await grabarMessage(payload);
                    const chatMember = await findMembers(message[0].to);
                    for (let i = 0; i < chatMember.members.length; i++) {
                        this.io.to(chatMember.members[i].toString()).emit('send-message', message[0]);
                    }
                }

            })

            socket.on('add-member-chat', async (payload) => {
                const chat = await AddMembersChat(payload);
     
                for (let i = 0; i < payload.data.members.length; i++) {
    
                    this.io.to(payload.data.members[i].toString()).emit('create-sala-chat', chat);
                }
                for (let i = 0; i < chat.admin.length; i++) {
     
                    this.io.to(chat.admin[i].toString()).emit('create-sala-chat', chat);
                }
            });

            
            socket.on('read-last-message', async (payload) => {
                const chat = await readMessage(payload);
                // console.log('131 ',chat);
                for (let i = 0; i < chat.members.length; i++) {

                    this.io.to(chat.members[i].toString()).emit('reading-last-messge', chat);
                }
           
            });

            socket.on('videoCall', async(payload)=>{
                this.io.to(payload.to).emit('videoCall',payload);
            });

            socket.on('answerCall', async(payload)=>{
                this.io.to(payload.to).emit('callAcepted',payload);
            });




            socket.on('disconnect', async () => {
                await usuarioDesconectado(uid);
                await terminarConexion(uid);
                    const listaUser = await listarMiembros(uid)
                    for (let i = 0; i < listaUser.length; i++) {
                        this.io.to(listaUser[i].idusuario.toString()).emit('lista-usuarios-activo', listaUser);
                    }
                
                console.log('se desconecto');
            })

        });
    }


}


module.exports = Sockets;