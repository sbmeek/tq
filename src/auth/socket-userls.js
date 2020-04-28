
'use strict';

const server = require('../server').server;
const uuid = require('uuid')
// const fetch = require('node-fetch');

const SocketIO =  require('socket.io');
const io = SocketIO(server);

const User = require('../cmods/user');

let conns = 0;

io.on('connection', async (socket) => {
    conns++;
    console.log('\x1b[32m%s\x1b[0m',`New connection | Socket ID: ${socket.id}`);
    console.log(`Connections: ${conns}`);
    
    // const ip = await fetch('https://jsonip.com', { mode: 'cors' })
    // const jip = await ip.json()

    setInterval(() => { 
        socket.emit('date-time', { iso: new Date() }) 
    }, 1000);

    socket.on('tq:exists', async (data) => {
        let name = data.username.toLowerCase();
        const user = await User.findOne({username: name})
        socket.emit('tq:exists', user);
    });

    socket.on('tq:login', async (data) => {
        const user = await User.findById(data._id);
        user.key = data.key;
        // let allowed = (user.key === data.key ? true : false);
        socket.emit('tq:login', user)
    });

    socket.on('tq:register', async (data) => {
        var key = uuid.v4();
        let today = new Date();

        let expireDate = new Date();
        expireDate.setDate(today.getDate() + 4);
        expireDate.setHours(0, 0, 0, 0);

        const user = new User({
            enteredname: data.tquser,
            username: data.tquser.toLowerCase(),
            key: key,
            createdAt: today,
            willExpireAt: expireDate,
            expired: false
        });
        
        await user.save();
        let id = await User.findOne({username: user.username}, {_id: 1});
        socket.emit('save:LS', {
            _id: id._id,
            key: key
        });
    });

    socket.on('disconnect', () => {
        console.log('\x1b[31m%s\x1b[0m', `Disconnection | Socket ID: ${socket.id}`);
        conns--;
        console.log(`Connections: ${conns}`);
    });

});