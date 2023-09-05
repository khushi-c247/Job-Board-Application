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
exports.demopassport = exports.emptyToken = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const UserModel_1 = __importDefault(require("../Model/UserModel"));
const env_1 = require("./env");
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
const opts = {};
opts.jwtFromRequest = passport_jwt_1.ExtractJwt.fromUrlQueryParameter("token");
opts.secretOrKey = env_1.key;
const demopassport = passport_1.default.use(new passport_jwt_1.Strategy(opts, function (jwt_payload, done) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield UserModel_1.default.findOne({
                email: jwt_payload.email
            });
            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false, { message: "Token dosent match" });
            }
        }
        catch (error) {
            console.log(error);
            return error;
        }
    });
}));
exports.demopassport = demopassport;
const emptyToken = (req, res, next) => {
    const token = opts.jwtFromRequest(req);
    if (!token) {
        return res.status(401).json({ message: "Token is empty" });
    }
    next();
};
exports.emptyToken = emptyToken;
// // const demopassport = async (error:Error, token:string) => {
// //     if (error || !token) {
// //         // response.status(401).json({ message: 'Unauthorized Message' });
// //         console.log("unauthorized message");
// //     } 
// // }
//     // try {
//     //                 const user : newUser | null = await User.findOne({
//     //                     email: jwt_payload.email
//     //                   })
//     //                   if(user) {
//     //                     return done(null, user);
//     //                   }
//     //                 else {
//     //                 return done(null, false, { message: "Token dosent match" });
//     //           }
//     //             } 
//     //         catch (error) {
//     //             return error   
//     //         }
// function demopassport(request:Request, response:Response, next:newUser) {
//     passport.authenticate('jwt', { session: false, }, async (error:Error, token:any) => {
//         if (error || !token) {
//             response.status(401).json({ message: 'Unauthorized Message' });
//         } 
//         try {
//             console.log('token',token)
//             const user = await User.findOne(
//                 {_id: token._id}
//             );
//             request.user = user;
//         } catch (error) {
//             next(error);
//         }
//         next();
//     });   
// }
// export default demopassport
