
class userController {
    async register(req, res, next) {
        try {
            return res.json({ success: true, status: 200 })
        }
        catch (error) {
            return res.json({
                error: error,
                success: false,
                status: 400,
                message: "Params missing",
            })
        }
    }
    async login(req, res) {
        try {
            delete req.user.password
            return res.cookie('token',req.token,{maxAge:60*60*1000})
            .json({ success: true, status: 200 })
        }
        catch (error) {
            return res.json({ success: false, status: 400, message: error })
        }
    }

    async signout(req, res) {
        try {
            delete req.user
            return res.status(200).clearCookie('token').redirect("/")
        }
        catch (error) {
            next(error)
        }
    }
}
const {register, login, signout} = new userController()
export {register, login, signout}