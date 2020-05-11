'use strict';

const mongoose = require('mongoose');
const Agenda = require('agenda');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;
const instance = require('../database').instance;

const uSchema = new Schema({
    username: {type: String, required: true, unique: true, lowercase: true},
    enteredname: {type: String, required: true, unique: true},
    key: {type: String, required: true},
    createdAt: {type: Date, default: new Date(), required: true},
    willExpireAt: {type: Date, required: true},
    expired: {type: Boolean, required: true}
});

uSchema.methods.compareKey = async (DBkey, LSkey) => {
    return await bcrypt.compare(DBkey, LSkey);
}

uSchema.methods.hashKey = async (key) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(key, salt);
        return hash;
    } catch (error) {
        console.error(error)   
    }
}

const User = mongoose.model('users', uSchema);

// Check expirations
uSchema.methods.checkExpirations = async () => {
    const uList = await User.find();
    (uList.length > 0 ? console.log('\x1b[33m%s\x1b[0m', `\nValidating users expirations (${new Date().toISOString()})`) : 0);
    uList.forEach(async (user, idx) => {
        let expireDate = new Date(user.willExpireAt);
        if(Date.now() >= expireDate.getTime()){
            console.log('\x1b[31m%s\x1b[0m', `\t#${idx} Expired: ${user.username}`);
            user.expired = true;
            await user.save();
        }else{
            let hr = expireDate - new Date();
            hr /= 3.6e+6; 
            console.log('\x1b[34m%s\x1b[0m', `\t#${idx} Not expired: ${user.username} | Hours left: ${hr.toFixed(6)}`);
        }
    });
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

//---
module.exports = User;