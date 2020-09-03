"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const serve_favicon_1 = __importDefault(require("serve-favicon"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const client_sessions_1 = __importDefault(require("client-sessions"));
const helmet_1 = __importDefault(require("helmet"));
require('dotenv').config();
const { SESSION_SECRET } = process.env;
const app = express_1.default();
require('./database'); // Establishes db connection
Promise.resolve().then(() => __importStar(require(path_1.default.join(__dirname, 'libs', 'user-expirations')))).then((userExpirations) => userExpirations.checkExpirations()); // Defines and starts agenda (job: check user expirations at 00:00 daily)
// Settings
app.set('port', process.env.PORT || 2017);
app.set('favicon', path_1.default.join(__dirname, '../favicon.ico'));
app.set('json spaces', 2);
// Middlewares
app.use(client_sessions_1.default({
    cookieName: 'proc',
    secret: SESSION_SECRET,
    duration: 24 * 60 * 60 * 1000,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
app.use(client_sessions_1.default({
    cookieName: 'tst',
    secret: SESSION_SECRET,
    duration: 24 * 60 * 60 * 1000,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
app.use(helmet_1.default());
app.use(serve_favicon_1.default(app.get('favicon')));
app.use(cors_1.default({ origin: 'http://127.0.0.1:3000' }));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(morgan_1.default('dev'));
// Routes
app.use('/user', user_routes_1.default);
// Static files
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.resolve(path_1.default.join('..', 'client', 'build'))));
}
exports.server = app.listen(app.get('port'), () => console.log('\x1b[32m%s\x1b[0m', `Server running :${app.get('port')}`));
require('./utils/sockets');
