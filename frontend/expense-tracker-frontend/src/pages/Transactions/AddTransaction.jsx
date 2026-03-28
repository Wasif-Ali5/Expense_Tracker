import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import transactionService from "../../services/transactionService.js";

const AddTransaction = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const initialType = queryParams.get("type") || "expense";

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    type: initialType,
    date: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await transactionService.addTransaction(formData);
      alert("Transaction added successfully");
      navigate("/dashboard");
    } catch (err) {
      console.error("Add error:", err.response?.data || err);
      alert("Error adding transaction");
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Add Transaction
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded bg-gray-700"
          required
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded bg-gray-700"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded bg-gray-700"
          required
        />

        {/* Type */}
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full mb-3 p-2 rounded bg-gray-700"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {/* Date */}
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full mb-4 p-2 rounded bg-gray-700"
          required
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;