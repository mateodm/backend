import { Router } from "express"

const cookies_router = Router()

cookies_router.get("/set", (req, res) => {
    return res.status(200).cookie("nombre_de_la_clave", "valor_de_esa_clave").json({success: true})
})

export default cookies_router