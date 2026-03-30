import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion"; 
import transactionService from "../../services/transactionService.js";

const AddTransaction = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Extract type from URL (?type=income or ?type=expense)
  const queryParams = new URLSearchParams(location.search);
  const initialType = queryParams.get("type") || "expense";
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    type: initialType,
    // Automatically sets input to today's date in YYYY-MM-DD format
    date: new Date().toISOString().split("T")[0], 
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 2. API Call
      await transactionService.addTransaction(formData);
      
      // 3. Success Redirect
      // Dashboard.jsx will automatically refetch data on mount
      navigate("/dashboard");
      } catch (err) {
        setError("Could not save. Check your connection.");
      } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0f172a] min-h-screen text-white flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1e293b] p-8 rounded-3xl w-full max-w-md shadow-2xl border border-white/5"
      >
        <h2 className="text-3xl font-black mb-6 text-center tracking-tight">
          Add <span className={formData.type === "income" ? "text-emerald-400" : "text-rose-400"}>
            {formData.type === "income" ? "Income" : "Expense"}
          </span>
        </h2>

         {error && 
         <div className="p-3 bg-rose-500/10 text-rose-500 text-xs rounded-lg border border-rose-500/20 mb-4 text-center">
          {error}
          </div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Description */}
          <div>
            <label className="text-[10px] uppercase font-bold text-gray-500 ml-1 tracking-widest">Description</label>
            <input
              type="text"
              name="title"
              placeholder="e.g., Monthly Rent"
              value={formData.title}
              onChange={handleChange}
              className="w-full mt-1 p-4 rounded-xl bg-gray-900 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-600"
              required
            />
          </div>

                  {/* Amount */}
        <div>
          <label className="text-[10px] uppercase font-bold text-gray-500 ml-1 tracking-widest">Amount (Rs)</label>
          <input
            type="number"
            name="amount"
            placeholder="0.00"
            min="0.01" // Prevents 0 or negative via UI
            step="0.01"
            value={formData.amount}
            onChange={handleChange}
            className="w-full mt-1 p-4 rounded-xl bg-gray-900 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-600"
            required
          />
        </div>

          {/* Category */}
          <div>
            <label className="text-[10px] uppercase font-bold text-gray-500 ml-1 tracking-widest">Category</label>
            <input
              type="text"
              name="category"
              placeholder="e.g., Food, Salary, Bills"
              value={formData.category}
              onChange={handleChange}
              className="w-full mt-1 p-4 rounded-xl bg-gray-900 border border-gray-700 focus:border-blue-500 outline-none transition-all placeholder:text-gray-600"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Type Selector */}
            <div>
              <label className="text-[10px] uppercase font-bold text-gray-500 ml-1 tracking-widest">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full mt-1 p-4 rounded-xl bg-gray-900 border border-gray-700 outline-none cursor-pointer text-sm"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            {/* Date Picker */}
            <div>
              <label className="text-[10px] uppercase font-bold text-gray-500 ml-1 tracking-widest">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full mt-1 p-4 rounded-xl bg-gray-900 border border-gray-700 outline-none transition-all text-sm"
                required
              />
            </div>
          </div>

          {/* Dynamic Action Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 mt-4 rounded-2xl font-bold text-lg transition-all shadow-lg hover:scale-[1.01] active:scale-[0.99] ${
                formData.type === "income" 
                ? "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/20" 
                : "bg-rose-600 hover:bg-rose-500 shadow-rose-900/20"
            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Saving..." : `Add ${formData.type}`}
          </button>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="w-full text-gray-500 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
          >
            Cancel
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddTransaction;