import mongoose from 'mongoose';

let collection = "ticket"

const ticket = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
  },
  product: {
    type: Array,
    required: true,
  },
  purchase_datetime: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
    required: true
  },
  purchaser: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "pending",
    required: true,
  },
});

const Ticket = mongoose.model(collection, ticket);

export default Ticket;