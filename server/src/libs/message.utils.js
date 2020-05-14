const User = require('../models/User');

module.exports.sendMessage = sendMessage = async ({ username, msg }, socket) => {
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