import Transaction from "../models/transaction.model.js";

export const getAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch all transactions for this user
    const transactions = await Transaction.find({ user: userId });

    // Calculate totals
    const totalIncome = transactions
      .filter(t => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
      .filter(t => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    // Calculate by category
    const byCategory = {};
    transactions.forEach(t => {
      if (t.type === "expense") {
        byCategory[t.category] = (byCategory[t.category] || 0) + t.amount;
      }
    });

    // Recent 5 transactions
    const recentTransactions = transactions
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    res.status(200).json({
      totalIncome,
      totalExpense,
      byCategory,
      recentTransactions,
    });

  } catch (error) {
    res.status(500).json({ message: "Error fetching analytics", error: error.message });
  }
};