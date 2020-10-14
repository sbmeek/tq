"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegister = exports.userLogin = exports.userExists = void 0;
const passport_1 = __importDefault(require("passport"));
const User_1 = __importDefault(require("models/User"));
const uuid_1 = require("uuid");
const user_expirations_1 = require("../utils/user-expirations");
const sockets_1 = require("utils/sockets");
const passport_local_1 = require("passport-local");
const passport_jwt_1 = require("passport-jwt");
const { SESSION_SECRET } = process.env;
// Authorization
passport_1.default.use(new passport_jwt_1.Strategy({
    jwtFromRequest: (req) => req.proc ? req.proc.proc : null,
    secretOrKey: SESSION_SECRET
}, (payload, done) => {
    User_1.default.findById({ _id: payload.sub }, (err, user) => {
        if (err)
            return done(err, false);
        if (user)
            return done(null, user);
        else
            return done(null, false);
    });
}));
// Authentication
passport_1.default.use('local', new passport_local_1.Strategy({
    usernameField: 'tquser',
    passwordField: 'tqpwd'
}, (tquser, tqpwd, done) => __awaiter(void 0, void 0, void 0, function* () {
    tquser = tquser.toLowerCase();
    try {
        const user = (yield User_1.default.findOne({
            $or: [{ username: tquser }, { email: tquser }]
        }));
        if (user !== null) {
            if (yield user.compareKeyOrPwd((user.keyOrPwd || user.key), tqpwd, user.isPermanentAccount)) {
                if (user.isPermanentAccount && !user.isEmailVerified) {
                    done({ emailNotVerified: true }, false);
                    return;
                }
                done(null, user);
            }
            else {
                done(null, false);
            }
        }
        else {
            done(null, false);
        }
    }
    catch (error) {
        console.log(error);
        done(error);
    }
})));
exports.userExists = (data, socket) => __awaiter(void 0, void 0, void 0, function* () {
    const name = data.username.toLowerCase();
    const user = yield User_1.default.findOne({ username: name });
    socket.emit('tq:exists', user);
});
exports.userLogin = (data, socket) => __awaiter(void 0, void 0, void 0, function* () {
    const user = (yield User_1.default.findById(data._id));
    user.key = user.keyOrPwd = data.key;
    if (!user.expired) {
        socket.emit('tq:login', user);
        sockets_1.addUser(user.username, socket.id);
    }
    else
        socket.emit('tq:login', { error: data._id, expired: true });
});
exports.userRegister = function (data, socket) {
    return __awaiter(this, void 0, void 0, function* () {
        let key = uuid_1.v4();
        const user = new User_1.default({
            enteredname: data.tquser,
            username: data.tquser.toLowerCase(),
            keyOrPwd: key,
            createdAt: new Date(),
            willExpireAt: user_expirations_1.getExpirationDate(),
            expired: false,
            isPermanentAccount: false
        });
        key = yield user.hashKeyOrPwd(user.keyOrPwd);
        const savedUser = yield user.save();
        socket.emit('save:LS', {
            _id: savedUser._id,
            key
        });
    });
};
