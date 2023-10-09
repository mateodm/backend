import Products from "../models/product.model.js";
import Cart from "../models/cart.model.js"
import { productService, cartService, ticketService } from "../service/index.js"
import Errorss from "../service/error/errors.js"
import CustomError from "../utils/customError.js"
import Ticket from "../models/ticket.model.js";
import generateEmailContent from "../utils/mailTemplate.js"
import sendMail from "../utils/mailer.js"
import mercadopago from "mercadopago"

class CartController {
    async getCarts(req, res, next) {
        try {
            let Carts = await cartService.getCarts()
            if (Carts) {
                return res.json({ status: 200, carts: Carts })
            }
            else {
                CustomError.createError({ name: "Cart not loaded", cause: "Database not works", code: Errorss.DATABASE_ERROR })
            }
        }
        catch (error) {
            next(error)
        }
    }
    async getCartById(req, res, next) {
        try {
            let id = req.params.cid
            let cartFind = await cartService.getByIdAndPopulate(id)
            if (cartFind) {
                return res.json({ status: 200, cart: cartFind })
            }
            else {
                CustomError.createError({ name: "Cart not found", cause: "Invalid CID", code: Errorss.INVALID_TYPE_ERROR })
            }
        }
        catch (error) {
            next(error)
        }
    }
    async createCart(req, res, next) {
        try {
            const cart = await cartService.create()
            return res.json({ status: 200, cart: cart })
        }
        catch (error) {
            next(error)
        }
    }
    async updateCart(req, res, next) {
        try {
            let cid = req.params.cid;
            let pid = req.params.pid;
            let quantity = Number(req.body.quantity);
            let cart = await cartService.getById(cid)
            let product = await productService.getById(pid)
            let stock = product.stock
            let cartProducts = cart.products
            let check = cartProducts.find(cart => cart.product === pid)
            if (!check) {
                if (quantity <= product.stock) {
                    let update = await cartService.update(cid, pid, quantity)
                    let getStock = await productService.getById(pid)
                    return res.json({ success: true, status: 200, update: update })
                }
                else {
                    CustomError.createError({ name: "Add product to the cart fail", cause: ["Not indicated stock available"], code: Errorss.INVALID_TYPE_ERROR })
                }
            }
            else {
                CustomError.createError({ name: "Add product to the cart fail", cause: ["Product already in the cart"], code: Errorss.INVALID_TYPE_ERROR })
            }
        }
        catch (error) {
            next(error)
        }
    }

    async deleteCart(req, res, next) {
        try {
            if (req.params.cid, req.params.pid) {
                let cid = req.params.cid
                let pid = req.params.pid
                const cart = await cartService.getById(cid)
                const products = cart.products
                if (cid, pid) {
                    const updatedCart = await Cart.findOneAndUpdate(
                        { _id: cid },
                        { $pull: { products: { product: pid } } },
                        { new: true }
                    ).populate("products.product", "title description stock thumbnail price code");
                    return res.json({
                        success: true, status: 200, updatedCart
                    })
                }
            }
            else {
                CustomError.createError({ name: "Invalid cart", cause: ["cart id:" + cid, "product id" + pid], code: Errorss.INVALID_TYPE_ERROR })
            }
        }
        catch (error) {
            next(error)
        }
    }
    async totalAmount(req, res, next) {
        let cid = req.params.cid
        let amount = 0
        let cartID = await Cart.findById(cid).populate({
            path: "products", populate: { path: "product", model: "products" }
        })
        let cartProducts = cartID.products
        cartProducts.forEach(product => {
            let price = Number(product.product.price) * product.quantity
            amount = amount + price
        })
        return res.json({
            status: 200,
            total: amount,
        })
    }
    async purchaseRequest(req, res, next) {
        try {
            if (req.params.cid && req.body.purchaser) {
                const cid = req.params.cid;
                let amount = 0
                let code = 0;
                const cart = await cartService.getByIdAndPopulate(cid);
                const productsInCart = cart.products;
                const tickets = await ticketService.getTickets();
                const notStockP = [];
                const successProducts = [];
                if (tickets.length > 0) {
                    code = Math.max(...tickets.map(ticket => Number(ticket.code))) + 1;
                }
                for (const productInfo of productsInCart) {
                    const check = await productService.getById(productInfo.product._id);
                    if (check.stock >= productInfo.quantity) {
                        successProducts.push({ ...check, quantity: productInfo.quantity })
                    } else {
                        notStockP.push(check);
                    }
                }
                for (const product of successProducts) {
                    let price = Number(product._doc.price) * Number(product.quantity);
                    amount = Number(amount) + Number(price);
                    const substract = Number(product._doc.stock) - Number(product.quantity);
                    await Products.findByIdAndUpdate(product._doc._id, { stock: substract });
                }
                const productRows = successProducts.map(product => `
                <tr>
                    <td>${product._doc.code}</td>
                    <td>${product._doc.title}</td>
                    <td>${product.quantity}</td>
                    <td>$${product._doc.price}</td>
                    <td>$${amount}</td>
                </tr>
                `).join('');
                const emailContent = generateEmailContent(productRows, req.body.purchaser, amount);
                const message = emailContent;
                await cartService.updateAndClear(cid);
                const body = { ...req.body, code: code, amount: amount, product: successProducts, status: "success" };
                await ticketService.create(body);
                await sendMail(req.body.purchaser, message)
                return res.json({ success: true, successProducts: successProducts, failedProducts: notStockP });
            } else {
                CustomError.createError({ name: "Fail purchase request", cause: ["Product id:" + req.params.cid + "Purchaser mail:" + req.body.purchaser], code: Errorss.INVALID_TYPE_ERROR })
            }
        }
        catch (e) {
            next(e)
        }
    }
    async mercadopagoRequest(req, res, next) {
        if (req.params.cid && req.body.purchaser) {
            const cid = req.params.cid;
            const cart = await cartService.getByIdAndPopulate(cid);
            const productsInCart = cart.products;
            const notStockP = [];
            const successProducts = [];
            let amount = 0
            for (const productInfo of productsInCart) {
                const check = await productService.getById(productInfo.product._id);
                if (check.stock >= productInfo.quantity) {
                    successProducts.push({ ...check, quantity: productInfo.quantity })
                } else {
                    notStockP.push(check);
                }
            }
            for (const product of successProducts) {
                let price = Number(product._doc.price) * Number(product.quantity);
                amount = Number(amount) + Number(price);
            }
            const items = successProducts.map((product) => ({
                id: product._doc._id,
                title: product._doc.title,
                unit_price: Number(product._doc.price),
                quantity: product.quantity,
            }));
            const preference = {
                cid: cid,
                items: items,
                back_urls: {
                    "success": `https://backend-ecommerce-r1ay.onrender.com`,
                    "failure": "https://backend-ecommerce-r1ay.onrender.com",
                    "pending": "https://backend-ecommerce-r1ay.onrender.com"
                },
                auto_return: "approved",
            };
            await cartService.updateAndClear(cid);
            const mpresponse = await mercadopago.preferences.create(preference);
            console.log(mpresponse)
            const body = { ...req.body, code: mpresponse.body.id, amount: amount, product: successProducts };
            await ticketService.create(body);
            return res.json({ success: true, products: successProducts, link: mpresponse.body.init_point })

        }
    }

    async addUnit(req, res, next) {
        try {
            let cid = req.params.cid
            let pid = req.params.pid
            let quantity = req.params.quantity
            let product = await productService.getById(pid)
            let check = product.stock
            if (cid && pid && quantity) {
                if (quantity <= product.stock) {
                    await Cart.findByIdAndUpdate(cid, {
                        $set: {
                            "products.$[elem].quantity": quantity
                        }
                    }, {
                        arrayFilters: [{ "elem.product": pid }]
                    });
                    return res.json({
                        status: 200,
                    })
                }
                else {
                    CustomError.createError({ name: "Fail subsstract/add unit", cause: ["cart id:" + cid + "product id:" + pid + "actual quantity" + quantity], code: Errorss.INVALID_TYPE_ERROR })
                }
            }
        }
        catch (error) {
            next(error)
        }
    }
    async substractUnit(req, res, next) {
        try {
            let cid = req.params.cid
            let pid = req.params.pid
            let quantity = req.params.quantity
            if (cid && pid && quantity) {
                await Cart.findByIdAndUpdate(cid, {
                    $set: {
                        "products.$[elem].quantity": quantity
                    }
                }, {
                    arrayFilters: [{ "elem.product": pid }]
                });
                return res.json({
                    status: 200,
                })
            }
            else {
                CustomError.createError({ name: "Fail subsstract/add unit", cause: ["cart id:" + cid + "product id:" + pid + "actual quantity" + quantity], code: Errorss.INVALID_TYPE_ERROR })
            }
        }
        catch (error) {
            next(error)
        }
    }
}
const { getCarts, deleteCart, createCart, getCartById, totalAmount, substractUnit, addUnit, updateCart, purchaseRequest, mercadopagoRequest } = new CartController();

export { getCarts, deleteCart, createCart, getCartById, totalAmount, substractUnit, addUnit, updateCart, purchaseRequest, mercadopagoRequest }