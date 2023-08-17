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
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const UserModel_1 = __importDefault(require("../Model/UserModel"));
const env_1 = require("../config/env");
const opts = {};
opts.jwtFromRequest = passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken();
//in env
opts.secretOrKey = env_1.key;
exports.default = passport_1.default.use(new passport_jwt_1.Strategy(opts, function (jwt_payload, done) {
    return __awaiter(this, void 0, void 0, function* () {
        const userpass = yield UserModel_1.default.findOne({ email: jwt_payload.email });
        if (userpass) {
            return done(null, userpass);
        }
        else {
            return done(null, false, { message: " user not found" });
        }
    });
}));
