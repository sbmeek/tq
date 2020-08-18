import { server } from 'server'
import SocketIO from 'socket.io'
const io = SocketIO(server)
import { userExists, userLogin, userRegister } from 'auth/local.auth';
import { sendMessage, answerMessage } from './message.utils'

export type OnlineUsrsType = {
    [index: string]: string;
}

export const onlineUsrs: OnlineUsrsType = {}
let conns = 0

io.on('connection', async (socket) => {
	conns++
	console.log('\x1b[32m%s\x1b[0m', `New connection | Socket ID: ${socket.id}`)
	console.log(`Connections: ${conns}`)
	io.emit('connections:updated', { n: conns })

	socket.on('tq:init-user', ({ username }) => {
        if(username !== undefined){
            for(let i in onlineUsrs){
                if(onlineUsrs[i] === username)
                    delete onlineUsrs[i]
            }
            onlineUsrs[socket.id] = username
            console.log(onlineUsrs)
        }
	})

	// User Auth
	socket.on('tq:exists', (data) => userExists(data, socket))
	socket.on('tq:login', (data) => userLogin(data, socket, onlineUsrs))
	socket.on('tq:register', (data) => userRegister(data, socket))

    // Msg
	socket.on('msg:send', (data) => sendMessage(data, socket, io, onlineUsrs))
	socket.on('msg:ans', (data) => answerMessage(data, socket))

	socket.on('disconnect', () => {
		console.log('\x1b[31m%s\x1b[0m', `Disconnection | Socket ID: ${socket.id}`)
		conns--
		console.log(`Connections: ${conns}`)
		io.emit('connections:updated', { n: conns })
		delete onlineUsrs[socket.id]
		console.log(onlineUsrs)
	})
})