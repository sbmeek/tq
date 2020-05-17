
'use strict';

const server = require('../server').server;
const SocketIO =  require('socket.io');
const io = SocketIO(server);
const { 
    userExists, 
    userLogin, 
    userRegister
} = require('../auth/local.auth');

const { 
    sendMessage,
    answerMessage
} = require('../libs/message.utils');

let conns = 0;
io.on('connection', async (socket) => {
    conns++;
    console.log('\x1b[32m%s\x1b[0m',`New connection | Socket ID: ${socket.id}`);
    console.log(`Connections: ${conns}`);
    io.emit('connections:updated', { n: conns });

    setInterval(() => { 
        socket.emit('date-time', { iso: new Date() }) 
    }, 1000);

    // User Auth
    socket.on('tq:exists', data => userExists(data, socket));
    socket.on('tq:login', data => userLogin(data, socket));
    socket.on('tq:register', data => userRegister(data, socket));

    // Send msg
    socket.on('msg:send', data => sendMessage(data, socket));
    
    // Answer msg
    socket.on('msg:ans', data => answerMessage(data, socket));

    socket.on('disconnect', () => {
        console.log('\x1b[31m%s\x1b[0m', `Disconnection | Socket ID: ${socket.id}`);
        conns--;
        console.log(`Connections: ${conns}`);
        io.emit('connections:updated', { n: conns });
    });
});