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
const User_1 = __importDefault(require("models/User"));
const user_routes_1 = require("routes/user.routes");
const uuid_1 = require("uuid");
const node_fetch_1 = __importDefault(require("node-fetch"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, accessToken } = req.body;
        const url = `https://graph.facebook.com/${userId}/?fields=name,email&access_token=${accessToken}`;
        const response = yield node_fetch_1.default(url);
        const data = yield response.json();
        const { name, id, email } = data;
        const username = name === null || name === void 0 ? void 0 : name.replace(' ', '-');
        if (email || id) {
            let user = yield User_1.default.findOne({ email: email || id });
            if (!user) {
                user = new User_1.default({
                    email: email || id,
                    enteredname: username,
                    username: username.toLowerCase(),
                    isPermanentAccount: true,
                    isEmailVerified: true,
                    authMethod: 'google'
                });
                user.keyOrPwd = yield user.hashKeyOrPwd(uuid_1.v4());
                yield user.save();
            }
            const { enteredname } = user;
            const token = user_routes_1.signToken('proc', user._id, true);
            req.proc.proc = token;
            res.json({ authenticated: true, enteredname, ok: true });
        }
        else {
            res.json({
                authenticated: false,
                ok: false,
                emailNotVerified: true
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            error: process.env.NODE_ENV === 'development' ? error.stack : 'Bv'
        });
    }
});
