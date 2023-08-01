import { model, Schema} from "mongoose"

let collection = "user"
let schema = new Schema({
    first_name: { type: String, required: true,},
    last_name: { type: String, required: true,},
    photo: { type: String, required: false},
    mail: { type: String, required: true, index: true,  unique: true}, 
    age: { type: Number, required: true},
    role: { type: String, enum: ["user", "admin"], default: "user"},
    password: { type: String, required: true},
    cart: { type: String}
})

let User = model(collection, schema)

export default User