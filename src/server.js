'use strict';

const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();

const app = express();
const flash = require('connect-flash');

require('./database');
require('./auth/local-auth');
require('./cmods/user');

// Settings
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);
app.set('views', './src/views');
app.set('favicon', path.join(__dirname, 'www', 'img', 'favicon.ico'));

// Middlewares
app.use(favicon(app.get('favicon')));
app.use(morgan('dev'));
app.use(express.static('./src/www'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({extended: false}));
app.use((req, res, next) => {
    app.locals.err = req.flash('err');
    next();
});

// Routes
app.use('/', require('./routes/index-routes'));

module.exports.server = app.listen(app.get('port'), () => console.log(`Server on port ${app.get('port')}`));
require('./auth/socket-userls');