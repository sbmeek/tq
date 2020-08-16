import { Socket, Server } from "socket.io"
import { OnlineUsrsType } from './sockets'
import User from "models/User"

export const sendMessage = async function <T extends {
    username: string;
    msg: string
}>({ username, msg }:T, socket: Socket, io: Server, onlineUsrs: OnlineUsrsType) {
	try {
		const _utmp = await User.findOneAndUpdate(
			{ username },
			{
				$push: {
					messages: { content: msg },
				},
			},
			{ new: true }
		)
		console.log(_utmp!.messages)
		for (let _uid in onlineUsrs) {
			if (onlineUsrs[_uid] === username)
				io.to(_uid).emit('msg:new', _utmp!.messages)
		}
		socket.emit('msg:send', { success: true, sent: true })
	} catch (error) {
		console.error(error)
		socket.emit('msg:send', {
			error: true,
			msg: error,
			success: false,
			sent: false,
		})
	}
}

export const answerMessage = async function <T extends {
    answer: string;
    _id: string;
}>({ answer, _id }: T, socket: Socket) {
	try {
		const _utmp = await User.findOneAndUpdate(
			{ 'messages._id': _id },
			{
				$set: { 'messages.$.answer': answer },
			},
			{ new: true }
		)
		socket.emit('msg:ans', {
			success: true,
			msgAnswered: true,
        })
        socket.emit('msg:new', _utmp!.messages);
	} catch (error) {
		console.error(error)
		socket.emit('msg:ans', {
			error: true,
			errorMsg: error,
			success: false,
			msgAnswered: false,
		})
	}
}
