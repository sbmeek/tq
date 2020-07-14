'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const uuid = require('uuid');
const { getExpirationDate } = require('../libs/user-expirations');
const { SESSION_SECRET } = process.env;

// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//     const user = await User.findById(id);
//     done(null, user);
// });

const cookieExtractor = req => {
    let proc = null;
    if(req && req.signedCookies){
        proc = req.signedCookies.proc
    }
    return proc;
}

// Authorization
passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: SESSION_SECRET
}, (payload, done) => {
    User.findById({_id: payload.sub}, (err, user) => {
        if(err) return done(err, false);
        if(user) return done(null, user);
        else return done(null, false);
    });
}));

// Authentication
passport.use('local', new LocalStrategy({
    usernameField: 'tquser',
    passwordField: 'tqpwd'
}, async (tquser, tqpwd, done) => {
    tquser = tquser.toLowerCase();
    try {
        const user = await User.findOne({username: tquser});
        if(await user.compareKey(user.key, tqpwd)){
            done(null, user);
        }else{
            done(null, false)
        }
    } catch (error) {
        console.log(error);
        done(error);
    }
}));

module.exports = {
    userExists: async (data, socket) => {
        let name = data.username.toLowerCase();
        const user = await User.findOne({username: name})
        socket.emit('tq:exists', user);
    },
    userLogin: async (data, socket, onlineUsrs) => {   
        const user = await User.findById(data._id);
        user.key = data.key;
        // let allowed = (user.key === data.key ? true : false);
        // let username = user.username;
        if(!user.expired){
            socket.emit('tq:login', user);
            onlineUsrs[socket.id] = user.username;
        }
        else socket.emit('tq:login', {error: data._id, expired: true})
    },
    userRegister: async (data, socket) => {
        let key = uuid.v4();
        const user = new User({
            enteredname: data.tquser,
            username: data.tquser.toLowerCase(),
            key: key,
            createdAt: new Date(),
            willExpireAt: getExpirationDate(),
            expired: false
        });
        key = await user.hashKey(user.key);
        const savedUser = await user.save();
        socket.emit('save:LS', {
            _id: savedUser._id,
            key
        });
    }
}