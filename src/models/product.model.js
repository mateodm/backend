import { model, Schema} from "mongoose"

let collection = "products"
let schema = new Schema({
    title: { type: String, required: true, index: true},
    description: { type: String, required: true},
    stock: { type: Number, required: false},
    thumbnail: { type: String, required: false},
    price: { type: Number, required: true},
    code: { type: String, required: true},
    created_by: { type: String, required: true, default: "admin"}
})

let Products = model(collection, schema)

export default Products