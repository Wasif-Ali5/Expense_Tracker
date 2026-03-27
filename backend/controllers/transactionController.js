import Transaction from '../models/transaction.model.js';

console.log("transaction Controller hit");


// 1. Add Transaction
export const addTransaction = async (req, res) => {
    try {
        const { user,title, amount, category, type, date } = req.body;

        const transaction = new Transaction({
            user: req.user.id, // Assuming user is authenticated and user info is in req.user
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


export const getTransactions = async (req, res) => {
  try {
    const { type, category, sort, order } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const userId = req.user.userId || req.user.id;
     if (!userId) {
      return res.status(401).json({ message: "User not found in token" });
    }
    const query = { user: userId };
    if (type){
        query.type = type;
    }
    if (category){
         query.category = category;
    }

    // Build sort
    const sortBy = {};
    if (sort) sortBy[sort] = order === "desc" ? -1 : 1;
    else{
        sortBy.date = -1; // default sort by date descending
    }

    const total = await Transaction.countDocuments(query);
    const transactions = await Transaction.find(query)
      .skip(skip)
      .limit(limit)
      .sort(sortBy);

    res.status(200).json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: transactions
    });

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

        const transaction = await Transaction.findOne({
                  _id: id,
                user: req.user.id
        });

        if(!transaction) {
            return res.status(404).json({
            message: "Transaction not found or not authorized"
        });
        }

        await transaction.deleteOne();

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

        const transaction = await Transaction.findOne({
                _id: id,
                user: req.user.id
        });

        if(!transaction) {
            return res.status(404).json({
            message: "Transaction not found or not authorized"
        });
        }

                     //update fields
        transaction.title = req.body.title || transaction.title;
        transaction.amount = req.body.amount || transaction.amount;
        transaction.category = req.body.category || transaction.category;
        transaction.type = req.body.type || transaction.type;
        transaction.date = req.body.date || transaction.date;

        await transaction.save();

        res.status(200).json({
            message: "Transaction updated successfully",
            data: transaction
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating transaction"
        });
    }
};