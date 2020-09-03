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
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("models/User"));
const user_expirations_1 = require("utils/user-expirations");
const account_validations_1 = __importDefault(require("utils/account-validations"));
const uuid_1 = require("uuid");
const account_utils_1 = require("utils/account.utils");
const crypto_js_1 = require("crypto-js");
const { SESSION_SECRET, EPROC_KEY } = process.env;
const router = express_1.Router();
const signToken = (iis, userId) => {
    return jsonwebtoken_1.default.sign({
        iis,
        sub: userId,
    }, SESSION_SECRET, { expiresIn: '1h' });
};
router.post('/auth', (req, res, next) => {
    passport_1.default.authenticate('local', { session: false }, (err, user) => {
        if (err !== null && err.emailNotVerified) {
            res.json({
                authenticated: false,
                ok: false,
                emailNotVerified: true
            });
        }
        else if (!user) {
            res.json({ ok: false });
        }
        else {
            const { _id, enteredname } = user;
            const token = signToken('proc', _id);
            req.proc.proc = token;
            res.json({ authenticated: true, enteredname, ok: true });
        }
    })(req, res, next);
});
router.post('/logout', (req, res, next) => {
    passport_1.default.authenticate('jwt', { session: false }, (_err, user) => {
        if (!user)
            res.json({ authenticated: false, ok: false });
        else {
            req.proc.reset();
            res.json({ username: '', ok: true });
        }
    })(req, res, next);
});
router.get('/authenticated', (req, res, next) => {
    passport_1.default.authenticate('jwt', { session: false }, (_err, user) => __awaiter(void 0, void 0, void 0, function* () {
        if (!user)
            res.json({ authenticated: false, user: null });
        else {
            yield user_expirations_1.setExpirationDate(user._id);
            const { username, enteredname, messages } = user;
            res.json({
                authenticated: true,
                username,
                enteredname,
                messages,
            });
        }
    }))(req, res, next);
});
router.post('/join', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body: data } = req;
        const validator = yield account_validations_1.default(data);
        if (validator.ok) {
            const user = new User_1.default(Object.assign(Object.assign({}, data), { enteredname: data.username, username: data.username.toLowerCase(), isPermanentAccount: true, isEmailVerified: false }));
            user.keyOrPwd = yield user.hashKeyOrPwd(data.pwd);
            user.save();
            account_utils_1.sendEmailConfirmationCode(req, user);
            res.json({ ok: true });
        }
        else {
            res.json(Object.assign({}, validator));
        }
    }
    catch (error) {
        console.error(error);
    }
}));
router.post('/verifyEmailKey', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { encToken } = req.body;
    try {
        const bytes = crypto_js_1.AES.decrypt(encToken, EPROC_KEY);
        const decToken = JSON.parse(bytes.toString(crypto_js_1.enc.Utf8));
        const tokenObj = jsonwebtoken_1.default.verify(decToken.token, EPROC_KEY);
        const user = yield User_1.default.findOne({ email: tokenObj.em });
        if ((user === null || user === void 0 ? void 0 : user.emailConfirmationCode) === tokenObj.ky) {
            if (!(user === null || user === void 0 ? void 0 : user.isEmailVerified)) {
                yield (user === null || user === void 0 ? void 0 : user.updateOne({ $set: { isEmailVerified: true } }));
                res.json({ wasEmailVerified: true, ok: true });
            }
            else {
                res.json({ ok: false });
            }
        }
        else {
            res.json({ wasEmailVerified: false, ok: false });
        }
    }
    catch (error) {
        res.json({
            wasEmailVerified: false,
            ok: false,
            stack: process.env.NODE_ENV === 'development' ? error.stack : '_',
        });
    }
}));
router.post('/tst_check', (req, res) => {
    const { enteredKey } = req.body;
    if (enteredKey === 'tq_check_tst_init') {
        if (req.tst.tst === undefined) {
            res.json({ isTester: false });
        }
        else {
            const tokenObj = jsonwebtoken_1.default.verify(req.tst.tst, SESSION_SECRET);
            if (tokenObj) {
                if (Date.now() / 1000 < tokenObj.exp) {
                    res.json({ isTester: true });
                }
                else {
                    req.tst.reset();
                    res.json({ isTester: false });
                }
            }
        }
    }
    else if (enteredKey === '722d316') {
        req.tst.tst = signToken('tst', uuid_1.v4());
        res.json({ isTester: true });
    }
    else {
        res.json({ isTester: false });
    }
});
router.use((_req, res) => {
    res.status(404).json({
        error: 8,
        code: '0- No c q pasó -x24',
        msg: 'De segurito un 400 y algo...',
        info: 'Esto es un json :D',
        pd: 'en velda, en velda, no sé',
        secret: {
            true: true,
            false: true,
            key: 'a usted no le importa',
        },
    });
});
exports.default = router;
