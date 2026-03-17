import Transaction from '../models/Transaction.js';


// 1. Add Transaction
export const addTransaction = async (req, res) => {
    try {
        const { user,title, amount, category, type, date } = req.body;

        const transaction = new Transaction({
            user: req.user._id, // Assuming user is authenticated and user info is in req.user
            title,
            amount,
            category,
            type, // income or expense
            date
        });

        await transaction.save();

        res.status(201).json({
            message: "Transaction added successfully",
            data: transaction
        });

    } catch (error) {
        res.status(500).json({
            message: "Error adding transaction",
            error: error.message
        });
    }
};


// 2. Get All Transactions
export const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();

        res.status(200).json(transactions);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching transactions"
        });
    }
};


// 3. Delete Transaction
export const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;

        await Transaction.findByIdAndDelete(id);

        res.status(200).json({
            message: "Transaction deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting transaction"
        });
    }
};


// 4. Update Transaction
export const updateTransaction = async (req, res) => {
    try {
        const { id } = req.params;

        const updated = await Transaction.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        res.status(200).json(updated);

    } catch (error) {
        res.status(500).json({
            message: "Error updating transaction"
        });
    }
};