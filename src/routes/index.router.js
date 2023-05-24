import {Router} from "express"
import api_router from "./api/api.router.js"
import views_router from "./views/index.router.js"
const router = Router()

router.use("/api", api_router)
router.use("/", views_router)

export default router