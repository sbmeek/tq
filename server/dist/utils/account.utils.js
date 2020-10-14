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
exports.sendEmailConfirmationCode = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const crypto_js_1 = require("crypto-js");
const { G_MAIL_ACCOUNT, G_CLIENT_ID, G_CLIENT_SECRET, G_REFRESH_TOKEN, G_ACCESS_TOKEN, EPROC_KEY } = process.env;
exports.sendEmailConfirmationCode = ({ headers: { origin } }, user) => __awaiter(void 0, void 0, void 0, function* () {
    const key = uuid_1.v4();
    jsonwebtoken_1.default.sign({
        ky: key,
        em: user.email
    }, EPROC_KEY, { expiresIn: '1d' }, (err, token) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            throw err;
        yield user.updateOne({ $set: { emailConfirmationCode: key } });
        const encToken = crypto_js_1.AES
            .encrypt(JSON.stringify({ token }), EPROC_KEY)
            .toString();
        const href = process.env.NODE_ENV === 'production'
            ? origin
            : 'http://localhost:3000';
        const mailOptions = {
            to: user.email,
            from: G_MAIL_ACCOUNT,
            subject: 'Confirmación de cuenta: TQ',
            html: `
            <div style="width: 352px;">
                <div>
                    <h3>Gracias por registrarte</h3>
                    <h4>Ahora confirme su cuenta</h4>
                    <p>Haz click en "Continuar" para confirmar tu cuenta, bienvenido a nuestra plataforma.</p>
                    <div style="text-align: right;">
                        <a href="${href}/account/verify?t=${encodeURIComponent(encToken)}">Continuar</a>
                    </div>
                </div>
            </div>
            `
        };
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: G_MAIL_ACCOUNT,
                clientId: G_CLIENT_ID,
                clientSecret: G_CLIENT_SECRET,
                refreshToken: G_REFRESH_TOKEN,
                accessToken: G_ACCESS_TOKEN
            }
        });
        const res = yield transporter.sendMail(mailOptions);
        return res;
    }));
});
