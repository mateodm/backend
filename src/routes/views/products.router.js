import { Router } from "express"
import ProductManager from "../../managers/product.js"
import Index from "../index.router.js"
import Products from "../../models/product.model.js";
import CartManager from "../../managers/cart.js";


let manager = new ProductManager("./src/json/products.json");
let cmanager = new CartManager("./src/json/carts.json")
const router = Router()


/* PRODUCTS */
router.get("/", async (req, res) => {
    const title = req.query.title || '';
    const page = parseInt(req.query.page) || 1;
    const pageSize = 6;
    const skip = (page - 1) * pageSize;
    const titleRegex = new RegExp(title, 'i');
    const count = await Products.countDocuments({ title: titleRegex });
    const totalPages = Math.ceil(count / pageSize);
    const totalPagesArray = Array.from({ length: totalPages }, (_, index) => index + 1);
    console.log(totalPagesArray)
    const products = await Products.find({ title: titleRegex })
      .skip(skip)
      .limit(pageSize)
      .exec();
    const productsSend = products.filter(product => product.stock !== 0);
    const actProducts = productsSend.map(product => ({
        title: product.title,
        description: product.description,
        price: product.price,
        _id: product._id,
    }));
    let load = true;
    return res.render("products", {
      load,
      data: actProducts,
      totalPages: totalPagesArray,
    });
  });

router.get("/:pid", async(req, res) => {
/*     let id = req.params.pid
    console.log(id)
    let product = await Products.findById(id) */
        return res.render("product",{
            success: true,
        })
})


export default router