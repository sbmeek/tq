'use strict';

const router = require('express').Router();
const passport = require('passport');
const JWT = require('jsonwebtoken');
const { setExpirationDate } = require('../libs/user-expirations');
const { SESSION_SECRET } = process.env;


const signToken = (userId) => (
    JWT.sign({
        iis: "proc",
        sub: userId
    }, SESSION_SECRET, { expiresIn: '1h' })
)

// router.get('/authed', isAuthed, (req, res) => {
//     res.send('Estas autenticado.')
// });

// router.get('/', isNotAuthed, (req, res) => {
//     // var ip = req.headers['x-forwarded-for'] || 
//     //     req.connection.remoteAddress || 
//     //     req.socket.remoteAddress ||
//     //     (req.connection.socket ? req.connection.socket.remoteAddress : null);
//     // console.log(ip);
//     console.log(req.user)
//     res.send('Server is up');
// });

// router.get('/auth/:tquser', (req, res, next) => {
//     let tquser = req.params.tquser;
//     if(req.user == undefined)
//         res.redirect('/');
//     else if(req.user.username === tquser){
//         res.render('layout', {
//             page: 'user/user-idx',
//             tquser: tquser,
//             title: tquser
//         });
//     }
//     else
//         res.redirect(`/auth/${req.user.username}`);
// });

router.post('/auth', (req, res, next) => {  
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if(err)
            console.error(err);
        if(!user){
            res.json({ok: false});
        }
        else{
            const {_id, enteredname} = user;
            const token = signToken(_id);
            res.cookie('proc', token, { httpOnly: true, sameSite: true, signed: true });
            res.status(200).json({ authenticated: true, enteredname })
        }
    })(req, res, next);
});

router.get('/logout', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if(!user)
            res.json({authenticated: false, success: false});
        else{
            res.clearCookie('proc');
            res.json({username: "", success: true});
        }
    })(req, res, next);
}); // dev purpose

router.get('/authenticated', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if(!user)
            res.json({authenticated: false, user: null});
        else{
            await setExpirationDate(user._id);
            const { username, enteredname, messages } = user
            res.json({ 
                authenticated: true,
                username,
                enteredname,
                messages
            });
        }
    })(req, res, next);
});

router.use((req, res) => {
    res.status(404).json({
        error: 8,
        code: '0- No c q pasó -x24',
        msg: "De segurito un 400 y algo...",
        info: 'Este mensaje contiene información ULTRA SECRETA',
        pd: 'en velda, en velda, no sé',
        secret: {
            true: true,
            false: true,
            key: 'a usted no le importa'
        }
    });
});

// function isAuthed(req, res, next){
//     if(req.isAuthenticated())
//         return next();
//     else
//         res.redirect('/');
// }

// function isNotAuthed(req, res, next){
//     if(!req.isAuthenticated())
//         return next();
//     else
//         res.redirect(`/auth/${req.user.username}`);
// }

module.exports = router;