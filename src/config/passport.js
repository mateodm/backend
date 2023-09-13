import passport from "passport";
import { Strategy } from "passport-local";
import GHStrategy from "passport-github2"
import jwt from "passport-jwt"
import { cartService, userService} from "../service/index.js"
import config from "./config.js";


const JWTStrategy = jwt.Strategy;

const SECRET_CLIENT = config.secretClient
const GITHUB_CLIENTID = config.clientID 
const callback = "http://localhost:8080/api/auth/github/callback"

export default function () {
    passport.serializeUser((user, done) => done(null, user._id))

    passport.deserializeUser(async (id, done) => {
        const user = await userService.getById(id)
        return done(null, user)
    })
    passport.use("register", new Strategy({ passReqToCallback: true, usernameField: "mail" }, async (req, username, password, done) => {
        try {
            let user = await userService.findOne({ mail: username })
            if (!user) {
                const user = req.body
                const newCart = await cartService.create();
                const cartSave = await newCart.save();
                user.cart = cartSave._id
                let create = await userService.create(user)
                return done(null, create)
            }
            return done(null, false)
        }
        catch (error) {
            return done(null, false)
        }
    }))
    passport.use("signin", new Strategy({ usernameField: "mail" }, async (username, password, done) => {
        try {
            let user = await userService.findOne({ mail: username })
            if (user) {
                return done(null, user)
            }
            return done(null, false)
        }
        catch (error) {
            return done(null, false)
        }
    }))
}

passport.use('jwt', new jwt.Strategy({
        jwtFromRequest: jwt.ExtractJwt.fromExtractors([(req)=>req?.cookies['token']]),
        secretOrKey: process.env.JWT_SECRET
    },
    async (jwt_payload,done) => {
        try {              
            let user = await userService.findOne({ email:jwt_payload.email })
            if (user) {    
                delete user.password
                return done(null, user)
            } else {
                return done(null, false)
            }
        } catch (error) {
            return done(error,false)
        }
    })
)
/* passport.use(
    'github',
    new GHStrategy(
        { clientID: GITHUB_CLIENTID ,clientSecret:SECRET_CLIENT,callbackURL:callback },
        async (accessToken,refreshToken,profile,done) => {
            try {
                let check = await User.findOne({ mail:profile._json.login })
                if (!check) {
                    let user = await User.create({
                        name:profile._json.name,
                        mail:profile._json.login,
                        age:18, 
                        photo:profile._json.avatar_url,
                        password:profile._json.id,
                        role: 0,
                    })
                    return done(null,user)	
                }
                return done(null, check)		
            } catch (error) {
                return done(error)
            }
        }
    )
)
 */
passport.authenticate("jwt", {session: false})
