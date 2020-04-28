'use strict';

const router = require('express').Router();
const passport = require('passport');

router.get('/authed', isAuthed, (req, res, next) => {
    res.send('Estas autenticado.')
});

router.get('/', (req, res, next) => {
    res.render('layout', {
        page: 'main/main-idx',
        title: 'TQ'
    });
});

router.get('/tq-auth/:tquser', (req, res, next) => {
    let tquser = req.params.tquser;
    if(req.user == undefined)
        res.redirect('/');
    else if(req.user.username === tquser){
        res.render('layout', {
            page: 'user/user-idx',
            tquser: tquser,
            title: tquser
        });
    }
    else
        res.redirect(`/tq-auth/${req.user.username}`);
});

router.post('/tq-auth', (req, res, next) => {
    passport.authenticate('local-auth', (err, user, info) => {
        if(!user)
            res.json({ok: false})
        else{ 
            req.logIn(user, function(err) {
                if (err) return next(err);
                res.json({ok: true});
            });
        }
    })(req, res, next);
});

router.get('/:user', (req, res, next) => {
    let tquser = req.params.user;
    if(!(tquser === 'tq-auth')){
        res.render('layout', {
            page: 'user/msg',
            tquser: tquser,
            title: tquser
        });
    }else
        res.status(404);
        next();
});

router.use((req, res, next) => {
    res.status(404).render('layout', {
        page: 'error/error-404',
        title: 'Error 404'
    });
});

function isAuthed(req, res, next){
    if(req.isAuthenticated())
        return next();
    else
        res.redirect('/');
}

module.exports = router;