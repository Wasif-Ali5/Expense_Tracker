import { motion } from "framer-motion";

const SummaryCards = ({ transactions }) => {
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  return (
    <div className="grid md:grid-cols-3 gap-4 mb-6">
      <Card title="Balance" amount={balance} color="blue" />
      <Card title="Income" amount={income} color="green" />
      <Card title="Expense" amount={expense} color="red" />
    </div>
  );
};

const Card = ({ title, amount, color }) => {
  const colorClasses = {
    blue: "text-blue-400",
    green: "text-green-400",
    red: "text-red-400",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gray-800 p-5 rounded-xl shadow-md transition"
    >
      <h2 className="text-gray-400">{title}</h2>

      <p className={`text-2xl font-bold ${colorClasses[color]}`}>
        Rs {amount}
      </p>
    </motion.div>
  );
};

export default SummaryCards;