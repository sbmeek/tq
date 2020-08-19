import { server } from 'server'
import SocketIO from 'socket.io'
const io = SocketIO(server)
import { userExists, userLogin, userRegister } from 'auth/local.auth'
import { sendMessage, answerMessage } from './message.utils'

export const onlineUsers = new Map<string, Set<string>>()
let conns = 0

export const addUser = (username: string, socketId: string) => {
	onlineUsers.has(username)
		? onlineUsers.get(username)?.add(socketId)
		: onlineUsers.set(username, new Set([socketId]))
	console.log(onlineUsers)
}

export const removeUser = (username: string, socketId: string) => {
	if (onlineUsers.has(username)) {
		onlineUsers.get(username)!.delete(socketId)
		if (onlineUsers.get(username)!.size === 0) onlineUsers.delete(username)
	}
	console.log(onlineUsers)
}

io.on('connection', async (socket) => {
	conns++
	console.log('\x1b[32m%s\x1b[0m', `New connection | Socket ID: ${socket.id}`)
	console.log(`Connections: ${conns}`)

	socket.on('tq:init-user', (data) => {
		const { username } = data
		if (username !== undefined) {
			socket.handshake.query.username = username
			addUser(username, socket.id)
		}
	})

	// User Auth
	socket.on('tq:exists', (data) => userExists(data, socket))
	socket.on('tq:login', (data) => userLogin(data, socket))
	socket.on('tq:register', (data) => userRegister(data, socket))

	// Msg
	socket.on('msg:send', (data) => sendMessage(data, socket, io, onlineUsers))
	socket.on('msg:ans', (data) => answerMessage(data, socket))

	socket.on('disconnect', () => {
		conns--
		console.log('\x1b[31m%s\x1b[0m', `Disconnection | Socket ID: ${socket.id}`)
        console.log(`Connections: ${conns}`)
		removeUser(socket.handshake.query.username, socket.id)
	})
})
