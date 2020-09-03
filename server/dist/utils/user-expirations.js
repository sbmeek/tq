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
exports.getExpirationDate = exports.setExpirationDate = exports.checkExpirations = void 0;
const agenda_1 = __importDefault(require("agenda"));
const User_1 = __importDefault(require("models/User"));
const instance = require('../database').instance;
exports.checkExpirations = () => __awaiter(void 0, void 0, void 0, function* () {
    const uList = yield User_1.default.find({ isPermanentAccount: false });
    uList.length > 0
        ? console.log('\x1b[33m%s\x1b[0m', `\nValidating users expirations (${new Date().toISOString()})`)
        : 0;
    const expired = {};
    const notExpired = {};
    uList.forEach((user, idx) => __awaiter(void 0, void 0, void 0, function* () {
        const expireDate = new Date(user.willExpireAt);
        if (Date.now() >= expireDate.getTime()) {
            expired[idx] = { Expired: user.username };
            user.expired = true;
            yield user.save();
        }
        else {
            let hr = expireDate.getTime() - new Date().getTime();
            hr /= 3.6e6;
            notExpired[idx] = {
                'Not expired': user.username,
                'Hours left': hr.toFixed(6),
            };
        }
    }));
    console.log('\x1b[31m%s\x1b[0m', `\nExpired users`);
    console.table(expired);
    console.log('\x1b[34m%s\x1b[0m', `\nActive users`);
    console.table(notExpired);
});
exports.setExpirationDate = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findByIdAndUpdate(_id, {
            willExpireAt: exports.getExpirationDate(),
        }, {
            new: true,
        });
        return Object.assign({ hasBeenUpdatedBySetExpirationDate: true, success: true }, user._doc);
    }
    catch (error) {
        console.error(error);
        return 1;
    }
});
exports.getExpirationDate = () => {
    const today = new Date();
    const expireDate = new Date();
    expireDate.setDate(today.getDate() + 4);
    expireDate.setHours(0, 0, 0, 0);
    return expireDate;
};
//\ t Define agenda and job
// And check temp users expirations
const agenda = new agenda_1.default({ mongo: instance });
agenda.define('set expired', { priority: 'high', concurrency: 10 }, (job) => __awaiter(void 0, void 0, void 0, function* () {
    exports.checkExpirations();
    console.log(`Users checked. Next validation: ${job.attrs.nextRunAt.toISOString()}\n`);
}));
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield agenda.every('0 0 * * *', 'set expired');
        yield agenda.start();
    });
})();
