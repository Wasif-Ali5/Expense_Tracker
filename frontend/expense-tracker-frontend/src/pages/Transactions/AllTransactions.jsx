import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Added for navigation
import useAuth from "../../hooks/useAuth.js"; // Added to access user for filename
import transactionService from "../../services/transactionService.js";
import TransactionsList from "../../components/TransactionList.jsx";
import Navbar from "../../components/Navbar.jsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { motion } from "framer-motion";

const AllTransactions = () => {
  const { user } = useAuth(); // Destructure user for the PDF filename
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const res = await transactionService.getTransactions();
      setTransactions(res.data || []);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Date", "Description", "Category", "Type", "Amount"];
    const tableRows = transactions.map(t => [
        new Date(t.date).toLocaleDateString(),
        t.title,
        t.category,
        t.type.toUpperCase(),
        `Rs. ${t.amount.toLocaleString()}`
    ]);

    autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 30,
        theme: 'grid',
        headStyles: { fillColor: [30, 41, 59] },
    });

    const dateStamp = new Date().toISOString().split('T')[0];
    const fileName = `${user?.name || user?.username || "User"}_Transactions_${dateStamp}.pdf`;
    doc.save(fileName);
  };

  return (
    <div className="bg-[#0f172a] min-h-screen text-white pb-12">
      <Navbar />
      
      <div className="max-w-5xl mx-auto pt-28 px-6">
        {/* BACK BUTTON */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors mb-6 group text-sm font-bold"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> 
          Back to Dashboard
        </motion.button>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6"
        >
          <div>
            <h1 className="text-5xl font-black tracking-tight">Statements</h1>
            <p className="text-gray-400 mt-2 text-lg italic">Audit and manage your entire financial history.</p>
          </div>
          
          <button 
            onClick={downloadPDF}
            className="group flex items-center gap-3 bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-900/20 active:scale-95"
          >
            <span className="text-xl group-hover:animate-bounce">📥</span>
            Download PDF Report
          </button>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium animate-pulse">Syncing transactions...</p>
          </div>
        ) : (
          <TransactionsList 
            transactions={transactions} 
            setTransactions={setTransactions} 
            showViewAll={false} 
          />
        )}
      </div>
    </div>
  );
};

export default AllTransactions;