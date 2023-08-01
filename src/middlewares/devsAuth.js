import jwt from "jsonwebtoken";
function auth (req, res, next) {
    const token = req.cookies.token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role === 1 || decoded.role === "admin") {
        return next()
    }
    return res.status(401).send("not authorized")
}
export default auth