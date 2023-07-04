import passport from "passport";
import { Strategy } from "passport-local";
import GHStrategy from "passport-github2"
import User from "../models/user.model.js";

const {GITHUB_CLIENTID, SECRET_CLIENT} = process.env
const callback = "http://localhost:8080/api/auth/github/callback"
export default function () {
    passport.serializeUser((user, done) => done(null, user._id))

    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id)
        return done(null, user)
    })
    passport.use("register", new Strategy({ passReqToCallback: true, usernameField: "mail" }, async (req, username, password, done) => {
        try {
            let user = await User.findOne({ mail: username })
            if (!user) {
                let user = await User.create(req.body)
                return done(null, user)
            }
            return done(null, false)
        }
        catch (error) {
            return done(null, false)
        }
    }))
    passport.use("signin", new Strategy({ usernameField: "mail" }, async (username, password, done) => {
        try {
            let user = await User.findOne({ mail: username })
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
passport.use(
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
                        age:18, /* Edad por defecto es 18 debido a que es el minimo, ya que github no envia la edad */
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
