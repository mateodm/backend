import { model, Schema, Types} from "mongoose"

let collection = "cart"
let schema = new Schema({
    products: [{
        product: {
        type: Types.ObjectId, required: true, ref: "product"
        },
        quantity: { type: Number, required: true
        },
        type: Object,
    }]
})

let Cart = model(collection, schema)

export default Cart