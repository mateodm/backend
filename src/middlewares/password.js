export default function passwordLength (req, res, next) {
    const password = req.body.password
    if (password.length > 8) {
        next()
    }
    else {
        return res.status(400).json({success: false, message: "La contraseña no supera los 7 caracteres"})
    }
}