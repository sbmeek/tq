const User = require('../models/User');

module.exports.sendMessage = async ({ username, msg }, socket) => {
    try {
        await User.findOneAndUpdate({username}, { 
            $push: {
                messages: { content: msg }
            } 
        });
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

module.exports.answerMessage = async ({ answer, msgId }, socket) => {
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