import { motion } from "framer-motion";

const SummaryCards = ({ transactions = [] }) => {
  console.log("Current Transactions in Cards:", transactions);
  // 1. Calculate Totals
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const balance = income - expense;
  
  // 2. Calculate percentage of income spent
  const expensePercentage = income > 0 ? Math.round((expense / income) * 100) : 0;

  return (
    <>
      {/* 3. Empty State Message: Only shows if there are no transactions */}
      {transactions.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-600/10 border border-blue-500/30 p-8 rounded-2xl mb-8 text-center backdrop-blur-md shadow-lg shadow-blue-900/10"
        >
          <div className="text-4xl mb-3">🚀</div>
          <h2 className="text-xl font-bold text-blue-300">Start your journey!</h2>
          <p className="text-gray-400 mt-2 max-w-md mx-auto">
            Your dashboard is looking a bit empty. Use the <b>+ Income</b> or <b>+ Expense</b> buttons above to record your first transaction.
          </p>
        </motion.div>
      )}

      {/* 4. Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Income Card */}
        <Card
          title="Total Income"
          amount={income}
          color="from-emerald-500 to-teal-700"
        />

        {/* Expense Card */}
        <Card
          title="Total Expense"
          amount={expense}
          color="from-rose-500 to-red-700"
          percent={expensePercentage}
        />

        {/* Balance Card */}
        <Card
          title="Net Balance"
          amount={balance}
          color="from-blue-600 to-indigo-700"
        />
        
      </div>
    </>
  );
};

const Card = ({ title, amount, color, percent }) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`p-6 rounded-2xl bg-gradient-to-br ${color} shadow-xl border border-white/10 relative overflow-hidden`}
    >
      {/* Decorative Glow Effect */}
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full blur-2xl" />

      <h2 className="text-sm font-bold opacity-80 uppercase tracking-widest">{title}</h2>
      
      <div className="flex items-end justify-between mt-5">
        <p className="text-3xl font-black tracking-tight text-white">
          Rs {amount.toLocaleString()}
        </p>
        
        {percent !== undefined && (
          <div className="flex flex-col items-end">
             <div className="text-[10px] font-black bg-black/40 px-3 py-1 rounded-full uppercase tracking-tighter border border-white/5 text-white/90">
                {percent}% of Income
             </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SummaryCards;