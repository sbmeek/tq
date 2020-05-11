'use strict';

const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const path = require('path');
const cookieParser = require('cookie-parser');
// const passport = require('passport');
// const MongoStore = require('connect-mongo')(session)
// const session = require('client-sessions');
const cors = require('cors');
require('dotenv').config();

const app = express();

const instance = require('./database').instance; // Establishes db connection
// require('./auth/local-auth'); // For passport
require('./cmods/User'); // Defines and starts agenda (job: check expirations at 00:00 daily)
require('./cmods/User').schema.methods.checkExpirations(); // Check expirations

// Settings
app.set('port', process.env.PORT || 4000);
app.set('favicon', path.join(__dirname, 'www', 'img', 'favicon.ico'));
app.set('json spaces', 2);

// Middlewares
app.use(favicon(app.get('favicon')));
app.use(cors());
// app.use(session({
//   cookieName: 'token', // cookie name dictates the key name added to the request object
//   secret: 'blar', // should be a large unguessable string
//   duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
//   cookie: {
//     path: '/api', // cookie will only be sent to requests under '/api'
//     maxAge: 60000, // duration of the cookie in milliseconds, defaults to duration above
//     ephemeral: false, // when true, cookie expires when the browser closes
//     httpOnly: true, // when true, cookie is not accessible from javascript
//     secure: false // when true, cookie will only be sent over SSL. use key 'secureProxy' instead if you handle SSL not in your node process
//   }
// }));
app.use(cookieParser('token'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('dev'));
// app.use(express.static('./src/www')); => env prod
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     store: new MongoStore({mongooseConnection: instance}),
//     saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// Routes
app.use('/', require('./routes/index-routes'));

module.exports.server = app.listen(app.get('port'), () => console.log('\x1b[32m%s\x1b[0m', `Server running :${app.get('port')}`));
require('./libs/sockets');