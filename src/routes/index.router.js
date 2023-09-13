import {Router} from "express"
import api_router from "./api/api.router.js"
import views_router from "./views/indexmongo.router.js"
import sendMail from "../utils/mailer.js"

const router = Router()

router.use("/api", api_router)
router.use("/", views_router)
router.get("/mail", async (req, res) => {
    return await sendMail()
})
export default router