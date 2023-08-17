import passport from 'passport'
import {Strategy as JwtStrategy ,ExtractJwt} from 'passport-jwt'
// import passportJWT from 'passport-jwt'
import { newUser } from '../interfaces/interfaces'
import user from '../Model/UserModel'
import {key} from "../config/env"
const opts : any= {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

//in env
opts.secretOrKey = key;
   
export default passport.use(new JwtStrategy(opts, 
        
async function(jwt_payload, done) {
   const userpass : newUser | null= await user.findOne({email: jwt_payload.email});
        if (userpass) {
            return done(null, userpass);   
        } else {
            return done(null, false, {message : " user not found"});
        }
    
}));