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
const isEmail = (email) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
};
const validatePwd = (pwd, cpwd) => {
    //At least one upper AND one lower
    const regexPwd = /^(?=.*[A-Z])(?=.*[a-z])/;
    const errors = {
        //Password and Confirm didn't match
        pwdNConfirmMatch: true,
        //Password length at least 8 chars
        pwdLength: true,
        //Pass regexPwd test
        pwdRegexUpperLower: true,
    };
    if (pwd !== cpwd)
        errors.pwdNConfirmMatch = false;
    if (pwd !== undefined && pwd.length < 8)
        errors.pwdLength = false;
    if (!regexPwd.test(pwd))
        errors.pwdRegexUpperLower = false;
    return errors;
};
const valdUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const usernameRegex = /^[a-zA-Z0-9]*$/;
    const errors = {
        //Username length at least 3 chars
        userLength: true,
        //Username cannot contain special chars
        userRegex: true,
        //Is username available?
        isUsernameAvailable: true
    };
    const user = yield User_1.default.findOne({ enteredname: username.toLowerCase() });
    if (user)
        errors.isUsernameAvailable = false;
    if (username.length < 3)
        errors.userLength = false;
    if (!usernameRegex.test(username))
        errors.userRegex = false;
    return errors;
});
// Run Validators
function ಠ_ಠ({ username, email, pwd, cpwd }) {
    return __awaiter(this, void 0, void 0, function* () {
        let errors = {
            isEmailValid: true,
        };
        if (!isEmail(email))
            errors.isEmailValid = false;
        const pwdValidations = validatePwd(pwd, cpwd);
        const usernameValds = yield valdUsername(username);
        errors = Object.assign(Object.assign(Object.assign({}, errors), pwdValidations), usernameValds);
        for (const e in errors) {
            if (!errors[e])
                return Object.assign(Object.assign({}, errors), { ok: false });
        }
        return { errors: null, ok: true };
    });
}
exports.default = ಠ_ಠ;
