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
exports.removeUser = exports.addUser = exports.onlineUsers = void 0;
const server_1 = require("server");
const socket_io_1 = __importDefault(require("socket.io"));
const io = socket_io_1.default(server_1.server);
const local_auth_1 = require("auth/local.auth");
const message_utils_1 = require("./message.utils");
exports.onlineUsers = new Map();
let conns = 0;
/**
 * Adds an user to the online users list.
 * Or a connection to an user's list.
 */
exports.addUser = (username, socketId) => {
    var _a;
    exports.onlineUsers.has(username)
        ? (_a = exports.onlineUsers.get(username)) === null || _a === void 0 ? void 0 : _a.add(socketId) : exports.onlineUsers.set(username, new Set([socketId]));
    console.log(exports.onlineUsers);
};
/**
 * Removes an user from the online users list.
 * Or a connection from an user's list.
 */
exports.removeUser = (username, socketId) => {
    if (exports.onlineUsers.has(username)) {
        exports.onlineUsers.get(username).delete(socketId);
        if (exports.onlineUsers.get(username).size === 0)
            exports.onlineUsers.delete(username);
    }
    console.log(exports.onlineUsers);
};
io.on('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
    conns++;
    console.log('\x1b[32m%s\x1b[0m', `New connection | Socket ID: ${socket.id}`);
    console.log(`Connections: ${conns}`);
    socket.on('tq:init-user', (data) => {
        const { username } = data;
        if (username !== undefined) {
            socket.handshake.query.username = username;
            exports.addUser(username, socket.id);
        }
    });
    // User Auth
    socket.on('tq:exists', (data) => local_auth_1.userExists(data, socket));
    socket.on('tq:login', (data) => local_auth_1.userLogin(data, socket));
    socket.on('tq:register', (data) => local_auth_1.userRegister(data, socket));
    // Msg
    socket.on('msg:send', (data) => message_utils_1.sendMessage(data, socket, io, exports.onlineUsers));
    socket.on('msg:ans', (data) => message_utils_1.answerMessage(data, socket));
    socket.on('disconnect', () => {
        conns--;
        console.log('\x1b[31m%s\x1b[0m', `Disconnection | Socket ID: ${socket.id}`);
        console.log(`Connections: ${conns}`);
        exports.removeUser(socket.handshake.query.username, socket.id);
    });
}));
