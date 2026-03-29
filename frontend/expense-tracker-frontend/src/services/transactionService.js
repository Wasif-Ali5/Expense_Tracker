import API from "./api.js";

const addTransaction = async (data) => {
  const res = await API.post("/transactions/add", data);
  return res.data;
};

// Increased default limit slightly to ensure charts have enough data points
const getTransactions = async (page = 1, limit = 50) => {
  const res = await API.get(`/transactions?page=${page}&limit=${limit}`);
  return res.data;
};
const getAllTransactions = async () => {
  const res = await API.get("/transactions?limit=1000"); // Fetch a large enough set for history
  return res.data;
};
const deleteTransaction = async (id) => {
  const res = await API.delete(`/transactions/${id}`);
  return res.data;
};

const updateTransaction = async (id, data) => {
  const res = await API.put(`/transactions/${id}`, data);
  return res.data;
};

// NEW: Connects to your backend analyticsController.js
const getAnalytics = async () => {
  const res = await API.get("/transactions/analytics"); 
  return res.data;
};

const transactionService = {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
  getAnalytics, 
  getAllTransactions,
};

export default transactionService;