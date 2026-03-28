import API from "./api";

export const registerUser = async (userData) => {
  const res = await API.post("/users/register", userData);
  return res.data;
};

export const loginUser = async (userData) => {
  const res = await API.post("/users/login", userData);
  return res.data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};