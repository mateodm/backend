import { Router } from "express"

const cookies_router = Router()

cookies_router.get("/set", (req, res) => {
    return res.status(200).cookie("nombre_de_la_clave", "valor_de_esa_clave").json({ success: true })
})

cookies_router.get("/", (req, res) => {
    return res.status(200).json({ success: true, cookies: req.cookies })
})

cookies_router.get("/delete", (req, res) => {
    return res.status(200).clearCookie("nombre_de_la_clave").json({ success: true })
})
cookies_router.get("/set/:mail", async (req, res) => {
    const mail = req.params.mail
    return res.status(200).cookie(
        "user",
        mail, { maxAge: 60000, signed: true }
    )
})

export default cookies_router