import { Router } from "express"
import Index from "../index.router.js"
import Products from "../../models/product.model.js";
import passport_call from "../../middlewares/passport_call.js";
import { getProductsView, getProductView } from "../../controllers/product.controller.js";
import jwt from "jsonwebtoken";

const router = Router()

router.get("/", passport_call("jwt"), getProductsView);

router.get("/:pid",  passport_call("jwt"), getProductView)


export default router