/* const fs = require('fs') */
import fs from "fs"
export default class ProductManager {
    #path;
    constructor(path) {
        this.#path = path;
    }
    async getProducts() {
        try {
            const listaProductos = await fs.promises.readFile(this.#path, "utf-8");
            return JSON.parse(listaProductos)
        }
        catch (e) {
            return []
        }
    }
    async getProductByID(id) {
        let producto = await this.getProducts()
        let check = producto.find((prod) => prod.id === id)
        if(!check) {
            return
        }
        return check
    }
    async idGenerator(products, product) {
        if (products.length === 0) {
            return product.id = 1;
        }

        else {
            return product.id = products[products.length - 1].id + 1;
        };

    }
    async addProduct(title, description, price, thumbnail, code, stock) {
        
        const producto = await this.getProducts()

        let productCODEFind = producto.find((product) => product.code === code)

        if (productCODEFind) {
            throw new Error("El código asignado ya se encuentra en otro producto")
        } 
        else if ( !title  || !description || !price || !thumbnail || !code ) {
            throw new Error("Falta completar uno de los campos del producto solicitado")
        } 
        else if (!productCODEFind) {  /* Si todos las condiciones se cumplen, se crea el objeto */
        const newProduct = {
            id: 0,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        }
            if (!stock) { /* En caso de no especificar el stock, se creara con 0 */
                newProduct.stock = 0
            }
            await this.idGenerator(producto, newProduct)
            producto.push(newProduct)
            await fs.promises.writeFile(this.#path, JSON.stringify(producto))
            return newProduct
        }
    }

    async updateProduct(id, selectedParameter, dataToUpdate) {
        console.log(id, selectedParameter, dataToUpdate)
        if (id === undefined || selectedParameter === undefined || dataToUpdate === undefined) {
            throw new Error("No ingresaste los parametros correspondientes")
        }
        else {
            const products = await this.getProducts()
            switch (selectedParameter) {
                case "title":
                    const titleUpdate = await products.map((products) => products.id === id ? { ...products, title: dataToUpdate } : products
                    );
                    await fs.promises.writeFile(this.#path, JSON.stringify(titleUpdate))
                    await this.getProducts()
                    break;
                case "description":
                    const descriptionUpdate = await products.map((products) => products.id === id ? { ...products, description: dataToUpdate } : products)
                    await fs.promises.writeFile(this.#path, JSON.stringify(descriptionUpdate))
                    break;
                case "code":
                    const codeUpdate = await products.map((products) => products.id === id ? { ...products, code: dataToUpdate } : products)
                    await fs.promises.writeFile(this.#path, JSON.stringify(codeUpdate))
                    break;
                case "thumbnail":
                    const thumbnailUpdate = await products.map((products) => products.id === id ? { ...products, thumbnail: dataToUpdate } : products)
                    await fs.promises.writeFile(this.#path, JSON.stringify(thumbnailUpdate))
                    break;
                case "price":
                    let price = parseInt(dataToUpdate)
                    console.log(price)
                    console.log(isNaN(price))
                    if (price >= 0) {
                        const priceUpdate = await products.map((products) => products.id === id ? { ...products, price: price } : products)
                        await fs.promises.writeFile(this.#path, JSON.stringify(priceUpdate))
                    }
                    else {
                        throw new Error("En el caso de querer actualizar price, tienes que ingresar un numero.")
                    }
                    break;
                case "stock":
                    let stock = parseInt(dataToUpdate)
                    if (stock >= 0) {
                        const stockUpdate = await products.map((products) => products.id === id ? { ...products, stock: stock } : products)
                        await fs.promises.writeFile(this.#path, JSON.stringify(stockUpdate))
                    }
                    else {
                        throw new Error("En el caso de querer actualizar stock, tienes que ingresar un numero.")
                    }
                    break;
            }
        }
    }
    async deleteProduct(id) {
        let producto = await this.getProducts()
        let check = producto.find((producto) => producto.id === id)
/*         if (check) {
            let filter = producto.filter((producto) => producto.id !== id)
            cart.push(filter)
            await fs.promises.writeFile(this.#path, JSON.stringify(cart))

        } else if (!check) {
            throw new Error("El id indicado no coincide con ninguno existente")
        }
 */
    }
}
/* MANAGER */
const manager = new ProductManager("./src/json/products.json"); 

/*  async function test() {

} 
test()
  */

