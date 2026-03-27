import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useAuth  from "../../hooks/useAuth.js";
import {transactionService} from "../../services/transactionService.js";
import Navbar from "../../components/Navbar.jsx";
import SummaryCards from "../../components/SummaryCards.jsx";
import TransactionsList from "../../components/TransactionList.jsx";
import ChartSection from "../../components/ChartSection.jsx";

const Dashboard = () => {
  const { user } = useAuth();
  const username =
  user?.name ||
  user?.username ||
  user?.email?.split("@")[0] ||
  "User";
  console.log("USER:", username);
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const text = `Hi ${username} 👋`;

    useEffect(() => {
        const fetchData = async () => {
            try {
            const res = await transactionService.getTransactions();
            setTransactions(res || []);
            } 
            catch (err) {
            console.error("Fetch error:", err.response?.data || err);
            setTransactions([]); 
            }
        };

    fetchData();
    }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white pt-20 px-6">
          <Navbar />
     <div className="pt-20 px-6">

        <motion.h1 className="text-4xl md:text-5xl font-bold mb-4 flex">
             {text.split("").map((char, index) => (
            <motion.span
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
                delay: index * 0.05,
            }}
            >
            {char}
            </motion.span>
           ))}
       </motion.h1>
        <p className="text-gray-400 mb-6">
          Welcome back to your Expense Tracker
        </p>

      <div className="flex gap-3 mb-6">
        <button 
          onClick={() => navigate("/add-transaction?type=income")}
        className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition">
            + Income
        </button>

        <button 
          onClick={() => navigate("/add-transaction?type=expense")}
          className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition">
            + Expense
        </button>
        </div>

        {/* Summary */}
        <SummaryCards transactions={transactions} />

        {/* Charts */}
        <ChartSection transactions={transactions} />

        {/* Transactions */}
        <TransactionsList transactions={transactions} />
      </div>
      </div>
  );
};

export default Dashboard;