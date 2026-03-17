import  express from 'express';
const router = express.Router();

import {
    addTransaction,
    getTransactions,
    deleteTransaction,
    updateTransaction
} from "../controllers/transactionController.js";

// Route → Controller mapping
router.post("/add", addTransaction);
router.get("/", getTransactions);
router.delete("/:id", deleteTransaction);
router.put("/:id", updateTransaction);

export default router;