"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
const { DB_CONNECTION_STRING, DB_USERNAME, DB_USERPWD, DB_NAME } = process.env;
const dbStr = DB_CONNECTION_STRING !== undefined
    ? DB_CONNECTION_STRING
        .replace('{DB_USERNAME}', DB_USERNAME)
        .replace('{DB_USERPWD}', DB_USERPWD)
        .replace('{DB_NAME}', DB_NAME)
    : null;
const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
};
mongoose_1.default.connect(dbStr || 'mongodb://localhost/tq', connectionOptions);
mongoose_1.default.connection.on('open', () => console.log('\x1b[32m%s\x1b[0m', 'Connected to database'));
exports.instance = mongoose_1.default.connection;
