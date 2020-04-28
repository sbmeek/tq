'use strict';

const mongoose = require('mongoose');
const Agenda = require('agenda');

// const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const instance = require('../database').instance;

const userSchema = new Schema({
    username: String,
    enteredname: String,
    key: String,
    createdAt: Date,
    willExpireAt: Date,
    expired: Boolean
});

userSchema.methods.compareKey = (DBkey, LSkey) => {
    return DBkey == LSkey;
}

const User = mongoose.model('users', userSchema);

// Check expirations

const agenda = new Agenda({mongo: instance});

agenda.define('set expired', {priority: 'high', concurrency: 10}, async job => {
    const usersList = await User.find();
    console.log(`Validando usuarios expirados... (${new Date().toISOString()})`);
    let idx = 0;
    usersList.forEach(async user => {
        let expireDate = new Date(user.willExpireAt);
        if(Date.now() >= expireDate.getTime()){
            console.log('\x1b[31m%s\x1b[0m', `#${idx} EXPIRADO: ${user.username}`);
            user.expired = true;
            await user.save();
        }else{
            let hr = expireDate - new Date();
            hr /= 3.6e+6; 
            console.log('\x1b[34m%s\x1b[0m', `#${idx} NO EXPIRADO: ${user.username} | Horas restantes: ${hr.toFixed(6)}`);
        }
        idx++;
    });
    console.log(`Usuarios validados. Próxima validación: ${job.attrs.nextRunAt.toISOString()}\n`);
});

(async function() {
    await agenda.every('0 0 * * *', 'set expired');
    await agenda.start();
})();

module.exports = User;