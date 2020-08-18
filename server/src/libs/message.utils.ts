import { Socket, Server } from 'socket.io'
import User from 'models/User'

export const sendMessage = async function <
	T extends {
		username: string
		msg: string
	},
	S extends Map<string, Set<string>>
>({ username, msg }: T, socket: Socket, io: Server, onlineUsers: S) {
	try {
		const _tempUser = await User.findOneAndUpdate(
			{ username },
			{
				$push: {
					messages: { content: msg },
				},
			},
			{ new: true }
		)
        console.log(_tempUser!.messages)
        const userSockets = onlineUsers.get(username);
        for(let e of userSockets!){
            io.to(e).emit('msg:new', _tempUser!.messages)
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

export const answerMessage = async function <
	T extends {
		answer: string
		_id: string
	}
>({ answer, _id }: T, socket: Socket) {
	try {
		const _tempUser = await User.findOneAndUpdate(
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
		socket.emit('msg:new', _tempUser!.messages)
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
