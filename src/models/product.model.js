import { model, Schema} from "mongoose"

let collection = "products"
let schema = new Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    stock: { type: Number, required: false},
    thumbnail: { type: String, required: true},
    price: { type: Number, required: true},
    code: { type: String, required: true}
})

let Products = model(collection, schema)

export default Products