'use strict';

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

mongoose.connection.on('open', () => console.log('\x1b[35m%s\x1b[0m', 'DB is connected'))
module.exports.instance = mongoose.connection;