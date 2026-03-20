import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  type: {    //income/expense
    type: String,
    required: true
  },
   category: {
    type: String,
    required: true
  }
},{
  timestamps: true
  } 
);

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;