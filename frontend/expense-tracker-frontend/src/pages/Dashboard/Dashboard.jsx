import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useAuth  from "../../hooks/useAuth.js";
import transactionService  from "../../services/transactionService.js";
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
  const text = `Hi,    ${username}`;

    useEffect(() => {
        const fetchData = async () => {
            try {
            const res = await transactionService.getTransactions();
            setTransactions(res.transactions || []);
            } 
            catch (err) {
            console.error("Fetch error:", err.response?.data || err);
            setTransactions([]); 
            }
        };

    fetchData();
    }, []);

  return (
      <div className="bg-[#0f172a] min-h-screen text-white pt-20 px-6">
      <Navbar />

      <div className="max-w-7xl mx-auto">

        {/* Greeting */}
        <h1 className="text-3xl font-bold mb-2">
          Hi {username} 👋
        </h1>
        <p className="text-gray-400 mb-6">
          Welcome back to your dashboard
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => navigate("/add-transaction?type=income")}
            className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            + Income
          </button>

          <button
            onClick={() => navigate("/add-transaction?type=expense")}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            + Expense
          </button>
        </div>

        {/* SUMMARY CARDS */}
        <SummaryCards transactions={transactions} />

        {/* CHARTS */}
        <ChartSection transactions={transactions} />

        {/* TRANSACTIONS */}
        <TransactionsList transactions={transactions} />

      </div>
    </div>
  );
};

export default Dashboard;