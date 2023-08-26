import passport from 'passport'
import {Strategy as JwtStrategy ,ExtractJwt} from 'passport-jwt'
// import passportJWT from 'passport-jwt'
import { newUser } from '../interfaces/interfaces'
import User from '../Model/UserModel'
import {key} from "./env"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const opts : any= {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

//in env
opts.secretOrKey = key;
   
export default passport.use(new JwtStrategy(opts, 
        
async function(jwt_payload, done) {
   const user : newUser | null= await User.findOne({email: jwt_payload.email});
        if (user) {
            return done(null, user);   
        } else {
            return done(null, false, {message : " user not found"});
        }
    
})) 