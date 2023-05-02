const fs = require('fs')

class ProductManager {
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
        let check = producto.find((prod) => prod.id === id)
        if (check) {
            return check

        }
        else if (!check) {
            throw new Error ("Product not found")
        }
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
    const newProduct = {
        id: 0,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
    }
    const producto = await this.getProducts()
        let productCODEFind = producto.find((product) => product.code === code)
        if(productCODEFind) {
        throw new Error("El producto ya existe")
        } else if (!productCODEFind){
            await this.idGenerator(producto, newProduct)
            await fs.promises.writeFile(this.#path, JSON.stringify([...producto, newProduct]))
         }
}

async updateProduct(id, selectedParameter, dataToUpdate) {
    if (id === undefined || selectedParameter === undefined|| dataToUpdate === undefined) {
        throw new Error ("No ingresaste los parametros correspondientes")
    }
    else {
        const products = await this.getProducts()
        switch(selectedParameter) {
            case "title":
                const titleUpdate = await products.map((products) => products.id === id ? { ...products, title: dataToUpdate } : products
            );
                await fs.promises.writeFile(this.#path, JSON.stringify(titleUpdate))
                await this.getProducts()
                break;
            case "description":
                const descriptionUpdate = await products.map((products) => products.id === id ? {...products, description: dataToUpdate } : products)
                await fs.promises.writeFile(this.#path,JSON.stringify(descriptionUpdate))
                break;
            case "code":
                const codeUpdate = await products.map((products) => products.id === id ? {...products, code: dataToUpdate } : products)
                await fs.promises.writeFile(this.#path,JSON.stringify(codeUpdate))
                break;
            case "thumbnail":
                const thumbnailUpdate = await products.map((products) => products.id === id ? {...products, thumbnail: dataToUpdate } : products)
                await fs.promises.writeFile(this.#path,JSON.stringify(thumbnailUpdate))
            break;
            case "price":
                if (!isNaN(dataToUpdate) === false) {
                    console.log(dataToUpdate)
                    throw new Error ("En el caso de querer actualizar price, tienes que ingresar un numero.")
                }
                else {
                    const priceUpdate = await products.map((products) => products.id === id ? {...products, price: dataToUpdate } : products)
                    await fs.promises.writeFile(this.#path,JSON.stringify(priceUpdate))
                }
                break;
            case "stock":
                if (!isNaN(dataToUpdate) === false) {
                    throw new Error ("En el caso de querer actualizar stock, tienes que ingresar un numero.")
                    }
                    else {
                        const stockUpdate = await products.map((products) => products.id === id ? {...products, stock: dataToUpdate } : products)
                        await fs.promises.writeFile(this.#path,JSON.stringify(stockUpdate))
                    }
                    break;
        }
    }
}
async deleteProduct(id) {
    let producto = await this.getProducts()
    let deleted = producto.find((producto) => producto.id === id)
    if(deleted) {

    } else if (!deleted) {
        throw new Error("El id indicado no coincide con ninguno existente")
    }

}
}



/* PRUEBA */
async function test() {
    const manager = new ProductManager("./products.json");


/* await manager.updateProduct(0, "stock", 8) */
await manager.addProduct("Producto5", "Descripcion", 400, "img.jpg", "148")
await manager.addProduct("Producto6", "Descripcion", 500, "img.jpg", "150")
await manager.addProduct("Producto7", "Descripcion", 500, "img.jpg", "155")
await manager.addProduct("Producto8", "Descripcion", 500, "img.jpg", "156")

}

test()


