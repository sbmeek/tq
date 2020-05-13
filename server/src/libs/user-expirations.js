const Agenda = require('agenda');
const User = require('../models/User');
const instance = require('../database').instance;

module.exports.checkExpirations = checkExpirations = async () => {
    const uList = await User.find();
    (uList.length > 0 ? console.log('\x1b[33m%s\x1b[0m', `\nValidating users expirations (${new Date().toISOString()})`) : 0);
    let expired = {};
    let notExpired = {};
    uList.forEach(async (user, idx) => {
        let expireDate = new Date(user.willExpireAt);
        if(Date.now() >= expireDate.getTime()){
            expired[idx] = {Expired: user.username};
            user.expired = true;
            await user.save();
        }else{
            let hr = expireDate - new Date();
            hr /= 3.6e+6;
            notExpired[idx] = {"Not expired": user.username, "Hours left": hr.toFixed(6) };
        }
    });
    console.log('\x1b[31m%s\x1b[0m', `\nExpired users`);
    console.table(expired);
    console.log('\x1b[34m%s\x1b[0m', `\nActive users`);
    console.table(notExpired);
}

module.exports.setExpirationDate = setExpirationDate = async (_id) => {
    try {
        const user = await User.findByIdAndUpdate(_id, { 
            willExpireAt: getExpirationDate() 
        }, 
        { 
            new: true 
        });
        return {
            hasBeenUpdatedBySetExpirationDate: true,
            success: true,
            ...user._doc
        };
    } catch (error) {
        console.error(error)
        return 1;
    }
    
}

module.exports.getExpirationDate = getExpirationDate = () => {
    let today = new Date();
    let expireDate = new Date();
    expireDate.setDate(today.getDate() + 4);
    expireDate.setHours(0, 0, 0, 0);
    return expireDate;
}

//\t Define agenda and job
const agenda = new Agenda({mongo: instance});
agenda.define('set expired', {priority: 'high', concurrency: 10}, async job => {
    checkExpirations();
    console.log(`Users checked. Next validation: ${job.attrs.nextRunAt.toISOString()}\n`);
});

(async function() {
    await agenda.every('0 0 * * *', 'set expired');
    await agenda.start();
})();