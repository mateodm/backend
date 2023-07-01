import { model, Schema} from "mongoose"

let collection = "user"
let schema = new Schema({
    name: { type: String, required: true,},
    photo: { type: String, required: false},
    mail: { type: String, required: true, index: true,  unique: true}, 
    age: { type: Number, required: true},
    role: { type: Number, required: true},
    password: { type: String, required: true}
})

let User = model(collection, schema)

export default User