import passport from 'passport'
import {Strategy as JwtStrategy ,ExtractJwt} from 'passport-jwt'
// import passportJWT from 'passport-jwt'
import user from '../Model/UserModel'

// const JwtStrategy = passportJWT.Strategy;
// const ExtractJwt = passportJWT.ExtractJwt;

const opts : any= {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

export default passport.use(new JwtStrategy(opts, 
        
async function(jwt_payload, done) {
   const userpass = await user.findOne({email: jwt_payload.email});
        if (userpass) {
            return done(null, userpass);   
        } else {
            return done(null, false, {message : " user not found"});
        }
    
}));