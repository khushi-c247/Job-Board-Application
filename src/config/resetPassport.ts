import passport from "passport";
import {Request, Response, NextFunction}from "express"
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { newUser } from "../interfaces/interfaces";
import User from "../Model/UserModel";
import { key } from "./env";
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
const opts: any = {};
opts.jwtFromRequest = ExtractJwt.fromUrlQueryParameter("token");
opts.secretOrKey = key;
const demopassport = passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
        try {
            const user : newUser | null = await User.findOne({
                email: jwt_payload.email
              })
              if(user) {
                return done(null, user);
              }
              
            else {
            return done(null, false, { message: "Token dosent match" });
      }
        } catch (error) {
            console.log(error);
            
            return error    
        }
      
    })
);
const emptyToken= (req:Request, res:Response, next:NextFunction) => {
    const token = opts.jwtFromRequest(req);
    if (!token) {
      return res.status(401).json({ message: "Token is empty" });
    }
    next();
  };
export {emptyToken, demopassport}


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
