export default function (req, res, next) {
    console.log(req.session.role)
    if(req.session?.role === 0 || req.session?.role === 1) {
        return next()
    }
    else {
        return res.status(401).json({ success: false, message:"Not authorized, please login and try again"})
    }
}