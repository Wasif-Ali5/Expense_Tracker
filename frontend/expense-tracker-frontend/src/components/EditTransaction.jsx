import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import transactionService from "../services/transactionService.js";

const EditTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    type: "expense",
    date: "",
  });

  useEffect(() => {
    const fetchDetails = async () => {
        try {
          // In your service: getTransactions returns res.data
          const response = await transactionService.getTransactions();
          
          // Look for the array inside .data (based on your Dashboard logic)
          const transactions = response.data || response; 
          
          const transaction = transactions.find((t) => t._id === id);
          
          if (transaction) {
            setFormData({
              title: transaction.title,
              amount: transaction.amount,
              category: transaction.category,
              type: transaction.type,
              date: transaction.date.split("T")[0], 
            });
          }
        } catch (err) {
          console.error("Error fetching transaction details", err);
        }
      };
      fetchDetails();
    }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await transactionService.updateTransaction(id, formData);
      navigate("/dashboard");
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div className="bg-[#0f172a] min-h-screen text-white flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="bg-[#1e293b] p-8 rounded-3xl w-full max-w-md border border-white/5 shadow-2xl">
        <h2 className="text-2xl font-black mb-6 text-center text-blue-400 font-sans">Edit Transaction</h2>
        
        <label className="text-xs text-gray-500 uppercase font-bold ml-1">Title</label>
        <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full mb-4 p-3 rounded-xl bg-gray-900 border border-gray-700 focus:border-blue-500 outline-none" required />

        <label className="text-xs text-gray-500 uppercase font-bold ml-1">Amount</label>
        <input type="number" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} className="w-full mb-4 p-3 rounded-xl bg-gray-900 border border-gray-700 focus:border-blue-500 outline-none" required />

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-xs text-gray-500 uppercase font-bold">Type</label>
            <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full p-3 rounded-xl bg-gray-900 border border-gray-700 outline-none">
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 uppercase font-bold">Category</label>
            <input type="text" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full p-3 rounded-xl bg-gray-900 border border-gray-700 outline-none" required />
          </div>
        </div>

        <label className="text-xs text-gray-500 uppercase font-bold ml-1">Date</label>
        <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full mb-8 p-3 rounded-xl bg-gray-900 border border-gray-700 outline-none" required />

        <button type="submit" className="w-full bg-blue-600 py-4 rounded-2xl font-bold hover:bg-blue-500 transition shadow-lg shadow-blue-900/20">
          Save Changes
        </button>
        <button type="button" onClick={() => navigate("/dashboard")} className="w-full mt-2 text-gray-500 text-sm hover:text-white transition">Cancel</button>
      </form>
    </div>
  );
};

export default EditTransaction;