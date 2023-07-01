function check(req, res, next) {
    let { name, password, mail} = req.body
    if (!name || !password || !mail) {
        return res.status(400).json({success: false, message:"Name, password or mail missing"})
    }
    else {
        next()
    }
}
export default check