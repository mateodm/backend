import passport from "passport"

export default (strategy)=> {
    return async(req,res,next)=> {
        passport.authenticate(
            strategy,
            (err,user,info)=> {
                
                if (err) {
                    return next(err).redirect
                }
                if (!user) {
                    return res.status(401).redirect("/signin")
                }
                return next()
            }
        )(req,res,next)
    }
}
