'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const msgSchema = new Schema(
    {
        sentAt: { type: Date, default: new Date() },
        content: { type: String, required: true },
        readed: { type: Boolean, default: false }
    }
);

const uSchema = new Schema({
    username: {
        type: String, 
        required: true,
        unique: true, 
        lowercase: true
    },
    enteredname: {
        type: String, 
        required: true, 
        unique: true
    },
    key: {
        type: String, 
        required: true
    },
    createdAt: {
        type: Date, 
        default: new Date(), 
        required: true
    },
    willExpireAt: {
        type: Date, 
        required: true
    },
    expired: {
        type: Boolean, 
        required: true
    },
    messages: [msgSchema]
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
        console.error(error);
    }
}

module.exports = mongoose.model('users', uSchema);