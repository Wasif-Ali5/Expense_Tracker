import API from "./api.js";

const addTransaction = async (data) => {
  const res = await API.post("/transactions/add", data);
  return res.data;
};

const getTransactions = async (page = 1, limit = 10) => {
  const res = await API.get(`/transactions?page=${page}&limit=${limit}`);
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

const transactionService = {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
};  
export default transactionService;