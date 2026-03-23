import  express from 'express';
const router = express.Router();
import authMiddleware from '../middleware/authMiddleware.js';
import {validateTransaction} from '../middleware/validation.js';
import { getAnalytics } from '../controllers/analyticsController.js';

import {
    addTransaction,
    getTransactions,
    deleteTransaction,
    updateTransaction
} from "../controllers/transactionController.js";

console.log("Transaction routes file loaded");
router.post("/add", authMiddleware,validateTransaction, addTransaction);
router.get("/", authMiddleware, getTransactions);
router.delete("/:id", authMiddleware, deleteTransaction);
router.put("/:id", authMiddleware, validateTransaction,updateTransaction);
router.get("/analytics",authMiddleware,getAnalytics);

export default router;