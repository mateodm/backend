function auth (req, res, next) {
    if (req.session?.role === 1) {
        return next()
    }
    return res.status(401).send("not authorized")
}
export default auth