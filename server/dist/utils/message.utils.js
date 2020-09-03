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
exports.answerMessage = exports.sendMessage = void 0;
const User_1 = __importDefault(require("models/User"));
exports.sendMessage = function ({ username, msg }, socket, io, onlineUsers) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const _tempUser = yield User_1.default.findOneAndUpdate({ username }, {
                $push: {
                    messages: { content: msg },
                },
            }, { new: true });
            console.log(_tempUser.messages);
            const userSockets = onlineUsers.get(username);
            for (let e of userSockets) {
                io.to(e).emit('msg:new', _tempUser.messages);
            }
            socket.emit('msg:send', { success: true, sent: true });
        }
        catch (error) {
            console.error(error);
            socket.emit('msg:send', {
                error: true,
                msg: error,
                success: false,
                sent: false,
            });
        }
    });
};
exports.answerMessage = function ({ answer, _id }, socket) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const _tempUser = yield User_1.default.findOneAndUpdate({ 'messages._id': _id }, {
                $set: { 'messages.$.answer': answer },
            }, { new: true });
            socket.emit('msg:ans', {
                success: true,
                msgAnswered: true,
            });
            socket.emit('msg:new', _tempUser.messages);
        }
        catch (error) {
            console.error(error);
            socket.emit('msg:ans', {
                error: true,
                errorMsg: error,
                success: false,
                msgAnswered: false,
            });
        }
    });
};
