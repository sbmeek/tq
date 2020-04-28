'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../cmods/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use('local-auth', new LocalStrategy({
    usernameField: 'tquser',
    passwordField: 'tqpwd',
    passReqToCallback: true
}, async (req, tquser, tqpwd, done) => {
    tquser = tquser.toLowerCase();
    const user = await User.findOne({username: tquser});
    if(user.compareKey(user.key, tqpwd)){
        done(null, user);
    }else{
        done(null, false, req.flash('err', '01'));
    }
}));