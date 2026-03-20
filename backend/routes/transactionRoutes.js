import  express from 'express';
const router = express.Router();
import authMiddleware from '../middleware/authMiddleware.js';

import {
    addTransaction,
    getTransactions,
    deleteTransaction,
    updateTransaction
} from "../controllers/transactionController.js";

console.log("Transaction routes file loaded");
router.post("/add", authMiddleware, addTransaction);
router.get("/", authMiddleware, getTransactions);
router.delete("/:id", authMiddleware, deleteTransaction);
router.put("/:id", authMiddleware, updateTransaction);

export default router;