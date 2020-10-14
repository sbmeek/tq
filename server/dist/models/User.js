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
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const msgSchema = new mongoose_1.Schema({
    sentAt: { type: Date, default: new Date() },
    content: { type: String, required: true },
    readed: { type: Boolean, default: false },
    answer: { type: String, required: false }
});
const uSchema = new mongoose_1.Schema({
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
    email: { type: String },
    emailConfirmationCode: { type: String },
    isEmailVerified: { type: Boolean },
    isPermanentAccount: { type: Boolean },
    authMethod: { type: String },
    keyOrPwd: { type: String },
    key: { type: String },
    createdAt: {
        type: Date,
        default: new Date(),
        required: true
    },
    willExpireAt: { type: Date },
    expired: { type: Boolean },
    messages: [msgSchema]
});
uSchema.methods.compareKeyOrPwd = (DBKeyOrPwd, KeyOrPwd, isPermanentAccount) => __awaiter(void 0, void 0, void 0, function* () {
    if (isPermanentAccount)
        return yield bcryptjs_1.default.compare(KeyOrPwd, DBKeyOrPwd);
    else
        return yield bcryptjs_1.default.compare(DBKeyOrPwd, KeyOrPwd);
});
uSchema.methods.hashKeyOrPwd = (keyOrPwd) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hash = yield bcryptjs_1.default.hash(keyOrPwd, salt);
        return hash;
    }
    catch (error) {
        console.error(error);
    }
});
exports.default = mongoose_1.model('users', uSchema);
