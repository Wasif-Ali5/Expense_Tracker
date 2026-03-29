import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import transactionService from "../../services/transactionService.js";
import Navbar from "../../components/Navbar.jsx";
import SummaryCards from "../../components/SummaryCards.jsx";
import TransactionsList from "../../components/TransactionList.jsx";
import ChartSection from "../../components/ChartSection.jsx";
import FinancialHealth from "../../components/FinancialHealth.jsx";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const username = user?.name || user?.username || user?.email?.split("@")[0] || "User";

  const [allTransactions, setAllTransactions] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalIncome: 0,
    totalExpense: 0,
    byCategory: {},
    recentTransactions: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        const [analyticsRes, transRes] = await Promise.all([
          transactionService.getAnalytics(),
          transactionService.getTransactions()
        ]);

        const transactionArray = transRes?.data || transRes?.data?.data || [];
        setAllTransactions(transactionArray);

        if (analyticsRes) {
          setAnalytics({
            totalIncome: analyticsRes.totalIncome || 0,
            totalExpense: analyticsRes.totalExpense || 0,
            byCategory: analyticsRes.byCategory || {},
            recentTransactions: analyticsRes.recentTransactions || transactionArray.slice(0, 5) 
          });
        }

        console.log("✅ Dashboard Sync Successful");
      } catch (err) {
        console.error("❌ Dashboard Sync Failed!", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#0f172a] min-h-screen flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#0f172a] min-h-screen text-white pb-12">
      <Navbar />
      
      <div className="max-w-7xl mx-auto pt-24 px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight">
              Hey, <span className="text-blue-500">{username}</span> 👋
            </h1>
            <p className="text-gray-400 mt-1">Here is what's happening with your money.</p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/add-transaction?type=income")}
              className="flex-1 md:flex-none bg-emerald-600 hover:bg-emerald-500 px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-900/20"
            >
              + Income
            </button>
            <button
              onClick={() => navigate("/add-transaction?type=expense")}
              className="flex-1 md:flex-none bg-rose-600 hover:bg-rose-500 px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-rose-900/20"
            >
              + Expense
            </button>
          </div>
        </div>

        <SummaryCards transactions={allTransactions} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          <div className="lg:col-span-2">
            <ChartSection 
              transactions={allTransactions} 
              byCategory={analytics.byCategory} 
            />
          </div>

          {/* Sidebar: Recent Transactions + View All Button */}
          <div className="lg:col-span-1 space-y-6">
              <TransactionsList 
                transactions={analytics.recentTransactions.length > 0 ? analytics.recentTransactions : allTransactions.slice(0, 5)} 
                setTransactions={setAllTransactions}
                showViewAll={true}
              />
            
            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/10 p-6 rounded-2xl border border-blue-500/20 shadow-xl">
              <h3 className="font-bold text-lg text-blue-300">Smart Tip 💡</h3>
              <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                You've spent the most on <span className="text-white font-semibold">
                  {Object.keys(analytics.byCategory)[0] || "nothing yet"}
                </span> this month. Reviewing your <span className="text-blue-400 cursor-pointer hover:underline" onClick={() => navigate("/transactions")}>full history</span> helps identify hidden leaks!
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <FinancialHealth 
            income={analytics.totalIncome} 
            expense={analytics.totalExpense} 
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;