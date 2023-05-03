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
            throw new Error ("Product not found")
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
            await fs.promises.writeFile(this.#path, JSON.stringify([...producto, newProduct]))
        }
    }

    async updateProduct(id, selectedParameter, dataToUpdate) {
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
                    if (!isNaN(dataToUpdate)) {
                        console.log(dataToUpdate)
                        throw new Error("En el caso de querer actualizar price, tienes que ingresar un numero.")
                    }
                    else {
                        const priceUpdate = await products.map((products) => products.id === id ? { ...products, price: dataToUpdate } : products)
                        await fs.promises.writeFile(this.#path, JSON.stringify(priceUpdate))
                    }
                    break;
                case "stock":
                    if (!isNaN(dataToUpdate)) {
                        throw new Error("En el caso de querer actualizar stock, tienes que ingresar un numero.")
                    }
                    else {
                        const stockUpdate = await products.map((products) => products.id === id ? { ...products, stock: dataToUpdate } : products)
                        await fs.promises.writeFile(this.#path, JSON.stringify(stockUpdate))
                    }
                    break;
            }
        }
    }
    async deleteProduct(id) {
        let producto = await this.getProducts()
        let check = producto.find((producto) => producto.id === id)
        if (check) {
            let filter = producto.filter((producto) => producto.id !== id)
            await fs.promises.writeFile(this.#path, JSON.stringify(filter))

        } else if (!check) {
            throw new Error("El id indicado no coincide con ninguno existente")
        }

    }
}
/* MANAGER */
const manager = new ProductManager("./src/json/products.json"); 

/*  async function test() {
    await manager.addProduct("producto1", "descripcion", 120000, "producto.jpg", "ABC", 3)
    await manager.addProduct("producto2", "descripcion", 800, "producto.jpg", "ABCD", 5)
    await manager.addProduct("producto3", "descripcion", 1500, "producto.jpg", "ABCE", 2)
    await manager.addProduct("producto4", "descripcion", 2000, "producto.jpg", "ABCA")
} 
test()
 */


