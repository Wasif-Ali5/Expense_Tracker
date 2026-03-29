import { useState } from "react";
import { useNavigate } from "react-router-dom";
import transactionService from "../services/transactionService.js";
import { motion, AnimatePresence } from "framer-motion";

const TransactionsList = ({ transactions, setTransactions, showViewAll = false }) => {
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const handleDelete = async (id) => {
    try {
      await transactionService.deleteTransaction(id);
      // Updates the parent state (Dashboard or AllTransactions)
      setTransactions((prev) => prev.filter((t) => t._id !== id));
      setDeletingId(null);
    } catch (err) {
      console.error("Delete error:", err);
      // Optional: Add a custom error toast here
    }
  };

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch = 
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || t.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className={`bg-[#1e293b] rounded-2xl shadow-xl border border-gray-700/50 flex flex-col overflow-hidden transition-all duration-500 ${showViewAll ? 'h-[600px]' : 'min-h-[70vh]'}`}>
      
      {/* HEADER & FILTERS */}
      <div className="p-6 border-b border-gray-700/50 bg-[#1e293b] z-10">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white tracking-tight">
              {showViewAll ? "Recent Transactions" : "Transaction History"}
            </h2>
            {showViewAll && (
              <button 
                onClick={() => navigate("/transactions")}
                className="text-[10px] uppercase tracking-widest font-black text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/20"
              >
                View All →
              </button>
            )}
          </div>

          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Search by title or category..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-2 text-xs focus:border-blue-500 outline-none text-white transition-all"
            />
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-gray-900/50 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white cursor-pointer outline-none"
            >
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
        </div>
      </div>

      {/* LIST CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-900/10 custom-scrollbar">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-sm italic font-medium">
            No matching records found.
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredTransactions.map((t) => (
              <motion.div
                key={t._id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group flex justify-between items-center p-4 rounded-2xl bg-gray-800/20 hover:bg-gray-800/40 border border-white/5 hover:border-white/10 transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-inner ${
                    t.type === "income" ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                  }`}>
                    {t.type === "income" ? "↓" : "↑"}
                  </div>
                  <div>
                    <p className="font-bold text-gray-100 text-sm tracking-wide">{t.title}</p>
                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mt-0.5">{t.category}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className={`font-black text-sm ${t.type === "income" ? "text-emerald-400" : "text-rose-400"}`}>
                      {t.type === "income" ? "+" : "-"} {t.amount.toLocaleString()}
                    </p>
                  </div>
                  
                  {/* ACTION BUTTONS */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                    <button 
                      onClick={() => navigate(`/edit-transaction/${t._id}`)} 
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 transition-all active:scale-90"
                      title="Edit Transaction"
                    >
                      <span className="text-sm">✎</span>
                    </button>
                    <button 
                      onClick={() => setDeletingId(t._id)} 
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-rose-400 hover:bg-rose-400/10 transition-all active:scale-90"
                      title="Delete Transaction"
                    >
                      <span className="text-sm">✕</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* FOOTER STATS */}
      <div className="p-4 bg-gray-900/30 text-center border-t border-gray-700/50">
        <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-black">
          Displaying {filteredTransactions.length} of {transactions.length} Total
        </p>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      <AnimatePresence>
        {deletingId && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1e293b] p-8 rounded-[2rem] max-w-sm w-full border border-white/10 text-center shadow-2xl"
            >
              <div className="w-16 h-16 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✕</div>
              <h3 className="text-xl font-black mb-2 text-white">Are you sure?</h3>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">This action is permanent and cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeletingId(null)} className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-bold transition-colors">Cancel</button>
                <button onClick={() => handleDelete(deletingId)} className="flex-1 py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold shadow-lg shadow-rose-900/30 transition-all">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TransactionsList;