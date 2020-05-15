const User = require('../models/User');

const sendMessage = async ({ username, msg }, socket) => {
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

const answerMessage = ({ answer, msgId }) => {
    //db.users.update({"messages._id": ObjectId("5ebdb21a04c4333b588823f5")}, {$set: {"messages.$.answer": "ok"}});
    console.log(answer, msgId);
}

module.exports.answerMessage = answerMessage;
module.exports.sendMessage = sendMessage;