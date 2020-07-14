const User = require('../models/User');

exports.sendMessage = async ({ username, msg }, socket, io, onlineUsrs) => {
    try {
        const _utmp = await User.findOneAndUpdate({username}, { 
            $push: {
                messages: { content: msg }
            }
        }, { new: true });
        console.log(_utmp.messages);
        for(let _uid in onlineUsrs){
            if(onlineUsrs[_uid] === username)
                io.to(_uid).emit('msg:new', _utmp.messages);
        }
        socket.emit('msg:send', { success: true, sent: true })
    } catch (error) {
        console.error(error)
        socket.emit('msg:send', {
            error: true,
            msg: error,
            success: false, 
            sent: false 
        });
    }
}

exports.answerMessage = async ({ answer, msgId }, socket) => {
    try {
        await User.findOneAndUpdate({"messages._id": msgId}, {
            $set: {"messages.$.answer": answer}
        });
        socket.emit('msg:ans', { 
            success: true,
            msgAnswered: true 
        });
    } catch (error) {
        console.error(error);
        socket.emit('msg:ans', {
            error: true,
            errorMsg: error, 
            success: false,
            msgAnswered: false 
        });
    }
}