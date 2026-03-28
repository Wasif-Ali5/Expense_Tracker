import { motion } from "framer-motion";

const SummaryCards = ({ transactions }) => {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      <Card
        title="Income"
        amount={income}
        color="from-green-500 to-green-700"
        percent={income ? 100 : 0}
      />

      <Card
        title="Expense"
        amount={expense}
        color="from-red-500 to-red-700"
        percent={expense ? 100 : 0}
      />

      <Card
        title="Balance"
        amount={balance}
        color="from-blue-500 to-purple-600"
        percent={balance > 0 ? 100 : 50}
      />
    </div>
  );
};

const Card = ({ title, amount, color, percent }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`p-6 rounded-2xl bg-gradient-to-r ${color} shadow-lg`}
    >
      <h2 className="text-sm opacity-80">{title}</h2>

      <div className="flex items-center justify-between mt-3">

        {/* Amount */}
        <p className="text-2xl font-bold">
          Rs {amount}
        </p>

        {/* Circular Progress */}
        <div className="w-16 h-16 rounded-full border-4 border-white/20 flex items-center justify-center">
          <span className="text-sm font-semibold">
            {percent}%
          </span>
        </div>

      </div>
    </motion.div>
  );
};

export default SummaryCards;